import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";

const initialState = {
    login: '',
    fullName: '',
    is_active: false,
    is_superuser: false,
    // password: '',
    token: '',
    loading: false,
    // error: '',
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
      userIsSuperuser: create.reducer((state) => {
        state.is_superuser = true;
      }),
      userIsNotSuperuser: create.reducer((state) => {
        state.is_superuser = false;
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
                  state.loading = true;
                  // state.error = "";
                },
                fulfilled: (state, action) => {
                  state.fullName = action.payload.data['fullName']
                  state.login = action.payload.data['login']
                  state.token = action.payload.data['token']
                  state.is_active = action.payload.data['is_active']
                  // state.error = "";
                },
                rejected: (state, action) => {
                  // state.error = action.payload;
                },
                settled: (state) => {
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
                  const data = await response.json()
                  console.log(data)
                  if (!response.ok) {
                      return rejectWithValue(data.login[0])
                  }
                  return {status: response.status, data}
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
                state.fullName = action.payload.data['fullName']
                state.login = action.payload.data['login']
                state.token = action.payload.data['token']
                state.is_active = action.payload.data['is_active']
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

export const { fetchUserLogin, fetchUserRegister, userIsSuperuser, userIsNotSuperuser } = userSlice.actions;
export const { userState } = userSlice.selectors;
export default userSlice.reducer;