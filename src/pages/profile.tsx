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
  `${import.meta.env.BASE_URL}avatars/avatar7.png`,
  `${import.meta.env.BASE_URL}avatars/avatar8.png`,
  `${import.meta.env.BASE_URL}avatars/avatar9.png`,
];



const Profile = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [editField, setEditField] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [isAvatarEditing, setIsAvatarEditing] = useState(false);

  useEffect(() => {
    fetch("http://localhost/client-area/profile.php", {
      credentials: "include",
    })
      .then(res => {
        if (res.status === 401) {
          window.location.href = "http://localhost/client-area/auth.php";
          return;
        }
        return res.json();
      })
      .then(data => {
        console.log("PROFILE DATA:", data);
        if (!data) return;
        setName(data.name ?? "");
        setUsername(data.username ?? "");
        setEmail(data.email ?? "");
        setPhone(data.phone ?? "");
        setGender(data.gender ?? "");

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

  const handleAvatarSave = async () => {
    const formData = new FormData();
    formData.append("avatar", selectedAvatar);
    formData.append("action", "avatar");  // 🔥 important

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

    const res = await fetch("http://localhost/client-area/profile.php", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if (res.ok) {
      // 🔥 Immediately re-fetch fresh data from backend
      const response = await fetch(
        "http://localhost/client-area/profile.php",
        { credentials: "include" }
      );

      const data = await response.json();

      setName(data.name ?? "");
      setUsername(data.username ?? "");
      setEmail(data.email ?? "");
      setPhone(data.phone ?? "");
      setGender(data.gender ?? "");
      setProfileImage(data.profile_image ?? null);

      setIsAvatarEditing(false);
      setSelectedAvatar(null);
    }
  };


  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("username", username);
    formData.append("phone", phone);
    formData.append("gender", gender);



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
      "http://localhost/client-area/profile.php",
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
      <img
        src={
          profileImage
            ? profileImage
            : `${import.meta.env.BASE_URL}avatars/avatar1.png`
        }
        className="w-full h-full object-cover"
        alt="Profile"
      />
    </div>


    return true;


  };

  if (loading) return <div className="text-red-500 p-20 text-3xl">LOADING...</div>;

  return (
    <div className="min-h-screen pt-3 md:pt-32 px-4 md:px-6 bg-white text-black">
      <div className="sticky top-0 z-50 pt-4">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <button
            onClick={() => window.history.back()}
            className="w-11 h-11 rounded-full bg-white shadow-md border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
          >
            <ArrowLeftCircle size={26} />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[320px_2px_1fr] gap-12">

        {/* LEFT PANEL */}
        <div className="flex flex-col items-center gap-6">

          {/* Profile Circle */}
          <div className="w-40 h-40 rounded-full bg-muted flex items-center justify-center overflow-hidden text-5xl font-bold text-white">
            <img
              src={
                profileImage
                  ? profileImage
                  : `${import.meta.env.BASE_URL}avatars/avatar4.png`
              }
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  `${import.meta.env.BASE_URL}avatars/avatar4.png`;
              }}
              className="w-full h-full object-cover"
              alt="Profile"
            />
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
                  setIsAvatarEditing(true);
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
                  const cleanPath = avatar.replace(import.meta.env.BASE_URL, "/");
                  setSelectedAvatar(cleanPath);
                  setProfileImage(avatar);
                  setIsAvatarEditing(true);
                }}
                className="w-16 h-16 rounded-full overflow-hidden border border-gray-400 bg-white hover:ring-2 hover:ring-[#7C83FF] transition"
              >
                <img src={avatar} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          {isAvatarEditing && (
            <div className="w-full flex justify-center">
              <button
                onClick={handleAvatarSave}
                className="mt-4 px-8 py-2 rounded-xl bg-purple-500 hover:bg-purple-600 text-white transition whitespace-nowrap"
              >
                Save Avatar
              </button>
            </div>
          )}
        </div>

        {/* VERTICAL DIVIDER */}
        <div className="hidden md:block bg-black/70 w-[2px]" />


        {/* RIGHT PANEL */}
        <div className="bg-white rounded-md p-6 md:p-10 shadow-sm w-full">

          <h2 className="text-2xl font-serif mb-8 text-center">
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
                disabled={editField !== "username"}
                onChange={(e) => setUsername(e.target.value)}
                className="pr-10 bg-gray-100"
              />

              {editField !== "username" && (
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition"
                  onClick={() => setEditField("username")}
                >
                  <Pencil size={16} />
                </button>
              )}
            </div>
          </div>

          {/* name */}
          <div className="mb-6">
            <label className="block text-xs mb-1 uppercase tracking-wide">
              Name:
            </label>

            <div className="relative">
              <Input
                value={name}
                disabled={editField !== "name"}
                onChange={(e) => setName(e.target.value)}
                className="pr-10 bg-gray-100"
              />

              {editField !== "name" && (
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition"
                  onClick={() => setEditField("name")}
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
                readOnly={!editField}
                className="pr-10 bg-gray-100"
              />

              {!editField && (
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-foreground transition"
                  onClick={() => setEditField(null)}
                >
                  <Pencil size={16} />
                </button>
              )}

            </div>
          </div>

          {/* phone */}
          <div className="mb-6">
            <label className="block text-xs mb-1 uppercase tracking-wide">
              Phone:
            </label>

            <div className="relative">
              <Input
                value={phone}
                disabled={editField !== "phone"}
                onChange={(e) => setPhone(e.target.value)}
                className="pr-10 bg-gray-100"
              />

              {editField !== "phone" && (
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition"
                  onClick={() => setEditField("phone")}
                >
                  <Pencil size={16} />
                </button>
              )}
            </div>
          </div>

          {/* gender */}
          <div className="mb-10">
            <label className="block text-xs mb-1 uppercase tracking-wide">
              Gender:
            </label>

            <div className="relative">

              {editField === "gender" ? (
                // 🔥 EDIT MODE (dropdown visible)
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full p-2 pr-10 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              ) : (
                // 🔒 VIEW MODE (no arrow)
                <input
                  type="text"
                  value={gender ? gender.charAt(0).toUpperCase() + gender.slice(1) : ""}
                  disabled
                  className="w-full p-2 pr-10 rounded-md bg-gray-100 border border-gray-300 cursor-default"
                />
              )}

              {editField !== "gender" && (
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition"
                  onClick={() => setEditField("gender")}
                >
                  <Pencil size={16} />
                </button>
              )}

            </div>
          </div>


          {/* Save Button */}
          {editField && (
            <Button
              onClick={async () => {
                const success = await handleUpdate();
                if (success) setEditField(null);
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
