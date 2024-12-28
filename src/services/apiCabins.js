import supabase from './supabase';
import { supabaseUrl } from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');
  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }
  return data;
}

export async function deleteCabin(id) {
  // Getting row
  const { data, error: fetchError } = await supabase
    .from('cabins')
    .select('image') // Fetch only the required column
    .eq('id', id) // Filter for the given ID
    .single();

  const imagePath = `${data.image}`.replaceAll(
    `${supabaseUrl}/storage/v1/object/public/cabin-images/`,
    ''
  );

  // Deleting row
  const { error } = await supabase.from('cabins').delete().eq('id', id);

  // Deleting cabin image from storage
  const { error: imageError } = await supabase.storage
    .from('cabin-images')
    .remove([imagePath]);

  if (error || fetchError || imageError) {
    console.log(error);
    throw new Error('Cabins could not be deleted');
  }
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.('https://');

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from('cabins');
  let result;

  try {
    if (!id) {
      // Create new cabin
      result = await query
        .insert([{ ...newCabin, image: imagePath }])
        .select()
        .single();
    } else {
      // Edit existing cabin
      result = await query
        .update({ ...newCabin, image: imagePath })
        .eq('id', id)
        .select()
        .single();
    }

    // Only upload image if it's a new file
    if (!hasImagePath) {
      const { error: storageError } = await supabase.storage
        .from('cabin-images')
        .upload(imageName, newCabin.image);

      if (storageError) {
        // Delete the cabin if image upload fails
        await supabase.from('cabins').delete().eq('id', result.data.id);
        throw new Error('Cabin image could not be uploaded');
      }
    }

    return result.data;
  } catch (error) {
    console.error(error);
    throw new Error('Cabin could not be created or updated');
  }
}
