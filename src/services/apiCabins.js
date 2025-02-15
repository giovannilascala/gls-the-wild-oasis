import supabase, { supabaseUrl } from "./supabase";

async function getCabins() {
  const { data, error } = await supabase
    .from('cabins')
    .select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
}

async function deleteCabin(id) {
  const { error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be deleted');
  }
}


async function createEditCabin(cabin, id) {
  const hasImagePath = cabin.image?.startsWith?.(supabaseUrl);

  // https://okzigybxysbrpfukbyyb.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const imageName = `${Math.random()}-${cabin.image.name}`.replaceAll('/', '');
  const imagePath = hasImagePath ?
    cabin.image :
    `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/edit the cabin
  let query = supabase.from('cabins');

  // A) CREATE
  if (!id)
    query = query
      .insert([{ ...cabin, image: imagePath }]);


  // B) EDIT
  if (id)
    query = query
      .update({ ...cabin, image: imagePath })
      .eq('id', id);


  const { data, error } = await query
    .select()
    .single();

  if (error)
    throw new Error('Cabin could not be created');

  // 2. Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase
    .storage
    .from('cabin-images')
    .upload(imageName, cabin.image);


  // 3. Delete cabin if there was an error uplading the image
  if (storageError) {
    await supabase
      .from('cabins')
      .delete()
      .eq('id', data.id);
    throw new Error('Cabin image could not be uploaded and the cabin was not created');
  }

  return data;
}

export { getCabins, deleteCabin, createEditCabin };