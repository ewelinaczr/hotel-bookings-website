import supabase, { supabaseUrl } from "./superbase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins can not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, editedId) {
  const hasImagePath = newCabin.imageUrl?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.imageUrl.name}`.replace(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.imageUrl
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");
  // Create cabin
  if (!editedId) {
    query = query.insert([{ ...newCabin, imageUrl: imagePath }]);
  }

  // Edit cabin
  if (editedId) {
    query = query
      .update({ ...newCabin, imageUrl: imagePath })
      .eq("id", editedId);
  }

  const { data, error } = await query.select().single();

  if (error) {
    throw new Error("Cannot add cabin");
  }

  // Upload image

  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.imageUrl);

  // Delete cabin if there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", newCabin.id);
    throw new Error("Cannot upload file and create cabin");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin can not be deleted");
  }

  return data;
}
