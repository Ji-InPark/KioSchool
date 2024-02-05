import useApi from '@hooks/useApi';
import { Workspace } from '@@types/index';
import { useSetRecoilState } from 'recoil';
import { workspacesAtom } from '@recoils/atoms';
import { useNavigate } from 'react-router-dom';

function useAdminUser() {
  const { adminApi } = useApi();
  const navigate = useNavigate();
  const setWorkspaces = useSetRecoilState(workspacesAtom);

  const isLoggedIn = () => {
    adminApi.get('/user');
    return true;
  };

  const fetchWorkspaces = () => {
    adminApi
      .get<Workspace[]>('/workspaces')
      .then((res) => setWorkspaces(res.data))
      .catch((error) => console.error('Failed to fetch workspaces:', error));
  };

  const createWorkspaces = (sapceName: string) => {
    adminApi
      .post('/workspace', { name: sapceName })
      .then((res) => {
        setWorkspaces((prev) => [...prev, res.data]);
      })
      .catch((error) => console.error('Failed to create workspace: ', error));
  };

  const leaveWorkspaces = (id: number) => {
    adminApi
      .post('/workspace/leave', { workspaceId: id as unknown as string })
      .then(() => {
        setWorkspaces((prev) => prev.filter((itm) => itm.id != id));
      })
      .catch((error) => console.error('Failed to leave workspace: ', error));
  };

  const addProduct = (product: any, file: File) => {
    const data = new FormData();
    data.append('body', new Blob([JSON.stringify(product)], { type: 'application/json' }));
    data.append('file', new Blob([file], { type: 'image/jpeg' }));

    adminApi
      .post('/product', data)
      .then(() => {
        navigate(`/admin/workspace/${product.workspaceId}/products`);
      })
      .catch((error) => console.error('Failed to add product: ', error));
  };

  const registerAccount = (account: string) => {
    adminApi.post('/user/toss-account', { accountUrl: account }).catch((error) => console.error('Failed to add account: ', error));
  };

  return { isLoggedIn, fetchWorkspaces, createWorkspaces, leaveWorkspaces, registerAccount, addProduct };
}

export default useAdminUser;
