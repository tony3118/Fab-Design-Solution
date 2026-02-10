import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Pencil } from "lucide-react";
import { ArrowLeftCircle } from "lucide-react";


const avatarList = [
  `${import.meta.env.BASE_URL}avatars/avatar1.png`,
  `${import.meta.env.BASE_URL}avatars/avatar2.png`,
  `${import.meta.env.BASE_URL}avatars/avatar3.png`,
  `${import.meta.env.BASE_URL}avatars/avatar4.png`,
  `${import.meta.env.BASE_URL}avatars/avatar5.png`,
  `${import.meta.env.BASE_URL}avatars/avatar6.png`,
];



const Profile = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  useEffect(() => {
    fetch("/client-area/profile.php", {
      credentials: "include",
    })
      .then(res => {
        if (res.status === 401) {
          window.location.href = "/client-area/auth.php";
          return;
        }
        return res.json();
      })
      .then(data => {
        if (!data) return;
        setName(data.name);
        setUsername(data.username);
        setEmail(data.email);
        if (data.profile_image) {
          setProfileImage(data.profile_image);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("PROFILE FETCH ERROR:", err);
        setLoading(false); // ✅ VERY IMPORTANT
      });
  }, []);

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("username", username);


    if (selectedAvatar) {
      formData.append("avatar", selectedAvatar);
    }

    if (profileImage && profileImage.startsWith("blob:")) {
      const fileInput = document.querySelector<HTMLInputElement>(
        'input[type="file"]'
      );
      if (fileInput?.files?.[0]) {
        formData.append("profile_image", fileInput.files[0]);
      }
    }


    const res = await fetch(
      "/client-area/profile.php",
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    );

    if (!res.ok) {
      const data = await res.json();
      toast({ title: data.error, variant: "destructive" });
      return false;
    }


    toast({
      title: "Profile updated",
      description: "Your changes were saved successfully.",
      duration: 2500,
      className:
        "animate-in fade-in zoom-in-95 slide-in-from-bottom-2",
    });

    <div className="w-40 h-40 rounded-full bg-muted flex items-center justify-center overflow-hidden text-5xl font-bold text-white">
      {profileImage ? (
        <img
          src={profileImage}
          className="w-full h-full object-cover"
          alt="Profile"
        />
      ) : (
        name.charAt(0).toUpperCase()
      )}
    </div>


    return true;


  };

  if (loading) return <p className="p-10">Loading profile...</p>;

  return (
    <div className="min-h-screen pt-32 px-6 bg-white text-black">
      <button
        onClick={() => window.history.back()}
        className="fixed top-24 left-6 z-50 w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
      >
        <ArrowLeftCircle size={40} />
      </button>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[320px_2px_1fr] gap-12">

        {/* LEFT PANEL */}
        <div className="flex flex-col items-center gap-6">

          {/* Profile Circle */}
          <div className="w-40 h-40 rounded-full bg-muted flex items-center justify-center overflow-hidden text-5xl font-bold text-white">
            {profileImage ? (
              <img
                src={profileImage}
                className="w-full h-full object-cover"
                alt="Profile"
              />
            ) : (
              name.charAt(0).toUpperCase()
            )}
          </div>


          {/* Upload Button */}
          <label className="px-5 py-2 !rounded-xl bg-purple-500 hover:bg-purple-600 text-white cursor-pointer text-sm transition">
            Edit your profile picture
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setProfileImage(URL.createObjectURL(file));
                  setIsEditing(true);
                }
              }}
            />
          </label>

          <span className="text-xs font-medium tracking-widset text-gray-500">OR</span>

          {/* Avatar Grid */}
          <div className="grid grid-cols-3 gap-4">
            {avatarList.map((avatar) => (
              <button
                key={avatar}
                onClick={() => {
                  setSelectedAvatar(avatar);
                  setProfileImage(avatar);
                  setIsEditing(true);
                }}
                className="w-16 h-16 rounded-full overflow-hidden border border-gray-400 bg-white hover:ring-2 hover:ring-[#7C83FF] transition"
              >
                <img src={avatar} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* VERTICAL DIVIDER */}
        <div className="hidden md:block bg-black/70 w-[2px]" />


        {/* RIGHT PANEL */}
        <div className="bg-white rounded-md p-10 shadow-sm">

          <h2 className="text-3xl font-serif mb-8 text-center">
            Profile Information
          </h2>

          {/* Username */}
          <div className="mb-6">
            <label className="block text-xs mb-1 uppercase tracking-wide">
              Username:
            </label>

            <div className="relative">
              <Input
                value={username}
                disabled={!isEditing}
                onChange={(e) => setUsername(e.target.value)}
                className="pr-10 bg-gray-100"
              />
              {!isEditing && (
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-foreground transition"
                  onClick={() => setIsEditing(true)}
                >
                  <Pencil size={16} />
                </button>
              )}

            </div>
          </div>

          {/* Email */}
          <div className="mb-10">
            <label className="block text-xs mb-1 uppercase tracking-wide">
              Email:
            </label>

            <div className="relative">
              <Input
                value={email}
                readOnly={!isEditing}
                className="pr-10 bg-gray-100"
              />


              {!isEditing && (
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-foreground transition"
                  onClick={() => setIsEditing(true)}
                >
                  <Pencil size={16} />
                </button>
              )}

            </div>
          </div>

          {/* Save Button */}
          {isEditing && (
            <Button
              onClick={async () => {
                const success = await handleUpdate();
                if (success) setIsEditing(false);
              }}

              className="px-8 py-2 !rounded-xl bg-purple-500 hover:bg-purple-600 text-white disabled:opacity-50"
            >
              Save Changes
            </Button>
          )}
        </div>
      </div>
    </div>
  );

};

export default Profile;
