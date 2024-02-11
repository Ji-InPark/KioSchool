import { ChangeEvent, useEffect, useState } from 'react';
import jsQR from 'jsqr';
import useAdminUser from '@hooks/useAdminUser';
import uploadPreview from '@resources/image/uploadPreview.png';
import { useRecoilValue } from 'recoil';
import { adminUserAtom } from '@recoils/atoms';

function AdminAccount() {
  const { registerAccount } = useAdminUser();
  const [fileURL, setFileURL] = useState<string>('');
  const adminuser = useRecoilValue(adminUserAtom);

  useEffect(() => {
    const extractAccountInfo = (url: string): { decodedBank: string; accountNo: string } | null => {
      const regex = /bank=([^&]+)&accountNo=([^&]+)/;
      const match = url.match(regex);

      if (match) {
        const [, bank, accountNo] = match;
        const decodedBank = decodeURIComponent(bank);

        return { decodedBank, accountNo };
      }

      return null;
    };
    extractAccountInfo(adminuser.accountUrl);
  }, []);

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      setFileURL('');
      return;
    }

    const newFileURL = URL.createObjectURL(event.target.files[0]);

    setFileURL(newFileURL);
  };

  const removeImage = (): void => {
    URL.revokeObjectURL(fileURL);
    setFileURL('');
  };

  const removeAmountQuery = (url: string): string => {
    const regex = new RegExp(/&?amount=\d+&?/g);
    return url.replace(regex, '');
  };

  const submitHandler = async () => {
    if (!fileURL) {
      alert('업로드할 이미지가 없습니다');
      return;
    }

    const image = new Image();
    image.src = fileURL;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    image.onload = () => {
      if (!context) return;

      canvas.width = image.width;
      canvas.height = image.height;

      context.drawImage(image, 0, 0, image.width, image.height);

      const imageData = context.getImageData(0, 0, image.width, image.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (!code) {
        alert('QR코드가 인식되지 않았습니다.\n다시 업로드 바랍니다.');
        return;
      }

      const decodedUrl: string = code.data;
      const url = removeAmountQuery(decodedUrl);
      registerAccount(url);
    };
  };

  return (
    <>
      <div>ADD ACCOUNT</div>
      <img src={fileURL || uploadPreview} alt={fileURL} />
      <input type="file" id="img" accept="image/*" onChange={onImageChange} />
      <button type="button" onClick={removeImage}>
        제거 버튼
      </button>
      {adminuser && <div>계좌 정보{adminuser.accountUrl}</div>}
      <button onClick={submitHandler}>submit</button>
    </>
  );
}

export default AdminAccount;
