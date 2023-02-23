import { createContext, useState } from 'react';
import { blankPost } from '@/lib/post/blankPost';

export const deskMenuContext = createContext();
export const deskAccountContext = createContext();
export const mobileBottomContext = createContext();
export const searchValueContext = createContext();
export const loadingContext = createContext();
export const loginDialogContext = createContext();
export const uploadDialogContext = createContext();
export const settingsContext = createContext();
export const newPostContext = createContext();
export const editPostContext = createContext();
export const editDialogContext = createContext();
export const sortContext = createContext();
export const prevVideoContext = createContext();
export const imageViewerContext = createContext();


export function ContextWrapper({ children }) {
  const [ deskMenu, setDeskMenu ] = useState(true);
  const [ deskAccount, setDeskAccount ] = useState(false);
  const [ mobileBottom, setMobileBottom ] = useState('Home');
  const [ searchValue, setSearchValue ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const [ loginDialog, setLoginDialog ] = useState({ open: false, tab: 0 });
  const [ uploadDialog, setUploadDialog ] = useState(false);
  const [ settings, setSettings ] = useState(false);
  const [ newPost, setNewPost ] = useState(blankPost);
  const [ editPost, setEditPost ] = useState({});
  const [ editDialog, setEditDialog ] = useState(false);
  const [ sort, setSort ] = useState('new');
  const [ prevVideo, setPrevVideo ] = useState();
  const [ imageViewer, setImageViewer ] = useState({ accordian: false, viewer: false });

  return (
    <deskMenuContext.Provider value={[ deskMenu, setDeskMenu ]}>
      <deskAccountContext.Provider value={[ deskAccount, setDeskAccount ]}>
        <mobileBottomContext.Provider value={[ mobileBottom, setMobileBottom ]}>
          <searchValueContext.Provider value={[ searchValue, setSearchValue ]}>
            <loadingContext.Provider value={[ loading, setLoading ]}>
              <loginDialogContext.Provider value={[ loginDialog, setLoginDialog ]}>
                <uploadDialogContext.Provider value={[ uploadDialog, setUploadDialog ]}>
                  <settingsContext.Provider value={[ settings, setSettings ]}>
                    <newPostContext.Provider value={[ newPost, setNewPost ]}>
                      <editPostContext.Provider value={[ editPost, setEditPost ]}>
                        <editDialogContext.Provider value={[ editDialog, setEditDialog ]}>
                          <sortContext.Provider value={[ sort, setSort ]}>
                            <prevVideoContext.Provider value={[ prevVideo, setPrevVideo ]}>
                              <imageViewerContext.Provider value={[ imageViewer, setImageViewer ]}>

                              { children }

                              </imageViewerContext.Provider>
                            </prevVideoContext.Provider>
                          </sortContext.Provider>
                        </editDialogContext.Provider>
                      </editPostContext.Provider>
                    </newPostContext.Provider>
                  </settingsContext.Provider>
                </uploadDialogContext.Provider>
              </loginDialogContext.Provider>
            </loadingContext.Provider>
          </searchValueContext.Provider>
        </mobileBottomContext.Provider>
      </deskAccountContext.Provider>
    </deskMenuContext.Provider>
  );
}
