import useApi from '@hooks/useApi';
import { Workspace } from '@@types/index';
import { userWorkspaceAtom } from '@recoils/atoms';
import { useSetRecoilState } from 'recoil';

function useWorkspace() {
  const { userApi } = useApi();
  const setUserWorkspace = useSetRecoilState(userWorkspaceAtom);

  const fetchWorkspace = (workspaceId: string | null) => {
    if (!workspaceId) return;

    userApi.get<Workspace>('/workspace', { params: { workspaceId: workspaceId } }).then((res) => {
      setUserWorkspace(res.data);
    });
  };

  return { fetchWorkspace };
}

export default useWorkspace;
