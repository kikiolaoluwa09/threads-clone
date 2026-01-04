import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, Image, Text, View } from "react-native";

const downloadImage = async (bucket: string, path: string): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    const { data, error } = await supabase.storage.from(bucket).download(path);
    if (error) {
      return reject(error);
    }
    const fr = new FileReader();
    fr.readAsDataURL(data);
    fr.onload = () => {
      resolve(fr.result as string);
    };
  });
};

export default function SupabaseImage({
  bucket,
  path,
  className,
  width = 100,
  height = 100,
}: {
  bucket: string;
  path: string;
  className: string;
  width?: number;
  height?: number;
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["supabaseImage", path],
    queryFn: () => downloadImage(bucket, path),
  });
  if (isLoading)
    return (
      <View style={{width, height}} className={`bg-neutral-900 ${className}`}/>
    );
  if (error)
    return <Text className="text-red-500">Error: {error.message}</Text>;

  return (
    <Image
      source={{
        uri: data,
        width,
        height,
      }}
      className={className}
    />
  );
}
