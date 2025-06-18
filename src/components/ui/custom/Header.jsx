import React, { useEffect, useState } from 'react';
import { Button } from '../button';
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { FaGoogle } from 'react-icons/fa';
import { Link, Navigate } from 'react-router-dom';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log(user);
  }, []);

  const GetUserProfile = (tokenInfo) => {
    setLoading(true);
    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: 'application/json'
        }
      })
      .then(resp => {
        localStorage.setItem('user', JSON.stringify(resp.data));
        setOpenDialog(false);
        setLoading(false);
        window.location.reload();
      })
      .catch(err => {
        console.error('Failed to fetch user profile', err);
        setLoading(false);
      });
  };

  const login = useGoogleLogin({
    onSuccess: GetUserProfile,
    onError: (error) => console.log(error)
  });

  return (
    <>
      <div className="p-3 shadow-sm flex justify-between items-center px-5">
        <img src="/logo.svg" alt="Site Logo" />
        <div>
          {user ? (
            <div className="flex items-center gap-3">
              <a href="/my-trips">
                <Button variant="outline" className="rounded-full">
                  My Trips
                </Button>
              </a>
              <a href="/create-trip">
                <Button variant="outline" className="rounded-full">
                  Create Trip
                </Button>
              </a>

              <Popover>
                <PopoverTrigger className="bg-gray-200 p-2 rounded">
                  <img
                    src={user?.picture}
                    referrerPolicy="no-referrer"
                    className="h-[35px] w-[35px] rounded-full border"
                    alt="User"
                  />
                </PopoverTrigger>
                <PopoverContent>
                  <h2
                    className="cursor-pointer"
                    onClick={() => {
                      googleLogout();
                      localStorage.clear();
                      window.location.reload();
                      <a href="/">
                      </a>
                    }}
                  >
                    Log Out
                  </h2>
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            <Button onClick={() => setOpenDialog(true)}>Sign in</Button>
          )}
        </div>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <img src="/logo.svg" alt="Logo" className="mb-4" />
              Sign in With Google
            </DialogTitle>
            <DialogDescription>
              Sign in to the app with Google authentication.
              <Button
                disabled={loading}
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center"
              >
                <FaGoogle className="h-5 w-5" />
                Sign in With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Header;
