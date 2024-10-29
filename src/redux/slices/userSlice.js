import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";

const initialState = {
    login: '',
    fullName: '',
    // email: '',
    // password: '',
    // accessToken: '',
    loading: false,
    // error: '',
    isAuthenticated: false,
};

const createSliceWithThunk = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
})

export const userSlice = createSliceWithThunk({
    name: 'user',
    initialState,
    selectors: {
        userState: (state) => state.user,
    },
    reducers: (create) =>({
        userAuthenticated: create.reducer((state) => {
          state.isAuthenticated = true;
        }),
        userfullName: create.reducer((state, action) => {
          state.fullName = action.payload;
        }),
        userLogin: create.reducer((state, action)=> {
          state.login = action.payload
        }),
        fetchUserLogin: create.asyncThunk(
            async ( loginPassword, { rejectWithValue }) => {
                try {
                    const response = await fetch(import.meta.env.VITE_LOGIN_URL, {
                        method: 'POST',
                        body: JSON.stringify(loginPassword),
                        headers: {
                          'Content-type': 'application/json; charset=UTF-8',
                        },
                    });
                    const data = await response.json()
                    console.log(data)
                    if (response.status === 200) {
                      return {status: response.status, data}
                    }
                    if (response.status === 400) {
                      return rejectWithValue(data.error[0])
                    }
                    if (response.status === 500) {
                      return rejectWithValue(data.error[0])
                    }
                } catch (e) {
                    return rejectWithValue('сервер не доступен!');
                }
            },
            {
                pending: (state) => {
                  // console.log('pending')
                  state.loading = true;
                  // state.error = "";
                },
                fulfilled: (state, action) => {
                  // console.log('fulfilled')
                  // console.log(action.payload.data['login'])
                  state.fullName = action.payload.data['fullName']
                  state.login = action.payload.data['login']
                  // state.accessToken = action.payload.data['access']
                  // state.error = "";
                },
                rejected: (state, action) => {
                  // console.log('rejected')
                  // state.error = action.payload;
                },
                settled: (state) => {
                  // console.log('settled')
                  state.loading = false;
                },
              }
        ),
        fetchUserRegister: create.asyncThunk(
          async (registrForm, { rejectWithValue }) => {
              try {
                  const response = await fetch(import.meta.env.VITE_REGISTRATION_URL, {
                      method: 'POST',
                      body: JSON.stringify(registrForm),
                      headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                      },
                  });
                  if (!response.ok) {
                      return rejectWithValue('Пользователь с таким логином уже существует')
                  }
                  return response.status
              } catch (e) {
                  return rejectWithValue('сервер не доступен!');
              }
          },
          {
              pending: (state) => {
                state.loading = true;
                // state.error = "";
              },
              fulfilled: (state, action) => {
                // state.login = action.payload;
                // state.error = "";
              },
              rejected: (state, action) => {
                // state.error = action.payload;
              },
              settled: (state) => {
                state.loading = false;
              },
            }
      )
    })
})

export const { userAuthenticated, userfullName, userLogin, fetchUserLogin, fetchUserRegister } = userSlice.actions;
export const { userState } = userSlice.selectors;
export default userSlice.reducer;