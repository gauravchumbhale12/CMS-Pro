import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [admins, setAdmins] = useState([]);

  // =========================
  // Realtime Listener
  // =========================

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "admins"),
      (snapshot) => {
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAdmins(list);
      }
    );

    return () => unsubscribe();
  }, []);

  // =========================
  // Add Admin
  // =========================

  const addAdmin = async (admin) => {
    await addDoc(collection(db, "admins"), {
      name: admin.name,
      email: admin.email,
      password: admin.password,
      role: admin.role,
      status: admin.status,

      photo: "",

      permissions: {
        dashboard: true,
        projects: false,
        tasks: false,
        reports: false,
        admins: false,
        settings: false,
      },
    });
  };

  // =========================
  // Update Admin
  // =========================

  const updateAdmin = async (admin) => {
    await updateDoc(doc(db, "admins", admin.id), {
      name: admin.name,
      email: admin.email,
      password: admin.password,
      role: admin.role,
      status: admin.status,
      permissions: admin.permissions,
    });
  };

  // =========================
  // Delete Admin
  // =========================

  const deleteAdmin = async (id) => {
    const admin = admins.find((a) => a.id === id);

    if (admin?.role === "Super Admin") {
      alert("Super Admin cannot be deleted.");
      return;
    }

    if (!window.confirm("Delete Admin?")) return;

    await deleteDoc(doc(db, "admins", id));
  };

  // =========================
  // Active / Inactive
  // =========================

  const toggleStatus = async (id) => {
    const admin = admins.find((a) => a.id === id);

    if (!admin) return;

    await updateDoc(doc(db, "admins", id), {
      status:
        admin.status === "Active"
          ? "Inactive"
          : "Active",
    });
  };

  // =========================
  // Update Permissions
  // =========================

  const updatePermissions = async (
    id,
    permissions
  ) => {
    await updateDoc(doc(db, "admins", id), {
      permissions,
    });
  };

  // =========================
  // Change Password
  // =========================

  const changePassword = async (
    id,
    newPassword
  ) => {
    await updateDoc(doc(db, "admins", id), {
      password: newPassword,
    });
  };

  // =========================
  // Update Profile
  // =========================

  const updateProfile = async (
    id,
    name,
    email
  ) => {
    await updateDoc(doc(db, "admins", id), {
      name,
      email,
    });
  };

  // =========================
  // Update Profile Photo
  // =========================

  const updateProfilePhoto = async (
    id,
    photo
  ) => {
    await updateDoc(doc(db, "admins", id), {
      photo,
    });
  };

  return (
    <AdminContext.Provider
      value={{
        admins,

        addAdmin,

        updateAdmin,

        deleteAdmin,

        toggleStatus,

        updatePermissions,

        changePassword,

        updateProfile,

        updateProfilePhoto,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () =>
  useContext(AdminContext);