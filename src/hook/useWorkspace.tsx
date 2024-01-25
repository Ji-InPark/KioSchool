import useApi from './useApi';
import { Workspace } from '../type';
import { userWorkspaceAtom } from '../recoil/atoms';
import { useSetRecoilState } from 'recoil';

function useWorkspace() {
  const { userApi } = useApi();
  const setUserWorkspace = useSetRecoilState(userWorkspaceAtom);

  const fetchWorkspace = (workspaceId: string | null) => {
    if (!workspaceId) return;

    userApi.get<Workspace>(`/workspace?workspaceId=${workspaceId}`).then((res) => {
      setUserWorkspace(res.data);
    });
  };

  return { fetchWorkspace };
}

export default useWorkspace;