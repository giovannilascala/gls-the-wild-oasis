import supabase from './supabase';

async function login({ email, password }) {

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  console.log(data);
  return data;
}

async function getCurrentUser() {
  const { data: { session } = {} } = await supabase.auth.getSession();

  if (!session) return null;

  const { data: { user } = {}, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return user;
}

async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email, password,
    options: {
      data: {
        fullName,
        avatar: ''
      }
    }
  });

  if (error) throw new Error('There was an error creating the user');

  return data;
}

async function updateCurrentUser({ password, fullName, avatar }) {
  let updateData;

  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };


  // 1. Update password OR full name
  const { data, error: userError } = await supabase.auth
    .updateUser(updateData);

  if (userError) throw new Error('There was an error updating the user');

  if (!avatar) return data;


  // 2. Upload avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: avatarError } = await supabase.storage
    .from('avatars')
    .upload(fileName, avatar);

  if (avatarError) throw new Error('There was an error uploading the avatar');


  // 3. Update avatar in the user
  const { data: updateUser, error: avatarUpdateError } = await supabase.auth.updateUser({ data: { avatar: `https://okzigybxysbrpfukbyyb.supabase.co/storage/v1/object/public/avatars//${fileName}` } });

  if (avatarUpdateError) throw new Error('There was an error updating the avatar');

  return updateUser;
}

export { login, logout, getCurrentUser, signup, updateCurrentUser };