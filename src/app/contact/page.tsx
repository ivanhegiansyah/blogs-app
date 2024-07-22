'use client';

import { BaseSyntheticEvent, useState } from 'react';
import Modal from '@/components/Modal';
import { FormType } from '../constant/types';

export default function Page() {
  const [name, setName] = useState<FormType>({
    value: '',
    isError: false,
    message: '',
  });
  const [email, setEmail] = useState<FormType>({
    value: '',
    isError: false,
    message: '',
  });
  const [message, setMessage] = useState<FormType>({
    value: '',
    isError: false,
    message: '',
  });
  const [countChar, setCountChar] = useState<number>(0);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const validateEmail = (value: string) => {
    return value.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const onChangeName = (value: string) => {
    setName((prevState) => ({
      ...prevState,
      isError:
        !value ||
        value.trim().length === 0 ||
        value.length < 3 ||
        value.length > 32,
      message:
        !value || value.trim().length === 0
          ? 'Nama wajib diisi'
          : value.length < 3
          ? 'Nama minimal 3 karakter'
          : value.length > 32
          ? 'Nama maksimal 32 karakter'
          : '',
      value,
    }));
  };

  const onChangeEmail = (value: string) => {
    setEmail((prevState) => ({
      ...prevState,
      message: !value ? 'Email wajib diisi' : '',
      isError: !value,
      value,
    }));

    if (!validateEmail(value)) {
      setEmail((prevState) => ({
        ...prevState,
        message: !value ? 'Email wajib diisi' : 'Format email salah',
        isError: true,
      }));
    }
  };

  const onChangeMessage = (value: string) => {
    setMessage((prevState) => ({
      ...prevState,
      isError:
        !value ||
        value.trim().length === 0 ||
        value.length < 3 ||
        value.length > 80,
      message:
        !value || value.trim().length === 0
          ? 'Pesan wajib diisi'
          : value.length < 3
          ? 'Pesan minimal 3 karakter'
          : value.length > 80
          ? 'Pesan maksimal 80 karakter'
          : '',
      value,
    }));
    setCountChar(value.trim().length);
  };

  const resetForm = () => {
    setName({
      value: '',
      isError: false,
      message: '',
    });
    setEmail({
      value: '',
      isError: false,
      message: '',
    });
    setMessage({
      value: '',
      isError: false,
      message: '',
    });
    setCountChar(0);
  };

  const handleSubmit = async (event: BaseSyntheticEvent) => {
    event.preventDefault();
    setIsOpenModal(true);
  };

  return (
    <>
      <Modal isOpen={isOpenModal} className="flex justify-center items-center">
        <div className="relative flex flex-col justify-center min-w-[600px] w-full p-5 shadow-md rounded-lg bg-white">
          <div className="flex">
            <span className="w-full text-black text-lg font-bold">
              Form Summary
            </span>
          </div>
          <div className="my-5 space-y-4">
            <p>Nama: {name.value}</p>
            <p>Email: {email.value}</p>
            <p>Pesan: {message.value}</p>
          </div>
          <button
            type="button"
            className="bg-secondary-50 py-2 px-4 rounded bg-emerald-500 text-white font-normal w-full hover:bg-emerald-400"
            onClick={(prev) => {
              setIsOpenModal(!prev);
              resetForm();
            }}
          >
            {'Ok'}
          </button>
        </div>
      </Modal>
      <main className="flex min-h-screen flex-col items-center space-y-10 px-20 py-10">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="w-full space-y-2 mb-4">
            <label className="block text-sm font-semibold text-black">
              Nama
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 focus:outline-none ${
                name?.isError && 'border-red-400'
              }`}
              id="name"
              type="text"
              placeholder="Nama"
              value={name?.value}
              onBlur={(event) => {
                onChangeName(event.target.value.trim().replace(/\s+/g, ' '));
              }}
              onChange={(event) => onChangeName(event.target.value)}
            />
            {name?.isError && (
              <span className="text-xs text-red-400">{name?.message}</span>
            )}
          </div>
          <div className="w-full space-y-2 mb-4">
            <label className="block text-sm font-semibold text-black">
              Alamat Email
            </label>
            <input
              className={`appearance-none border rounded w-full py-2 px-3 focus:outline-none ${
                email?.isError && 'border-red-400'
              }`}
              id="email"
              type="text"
              placeholder="example@email.com"
              value={email?.value}
              onChange={(event) => onChangeEmail(event.target.value)}
            />
            {email?.isError && (
              <span className="text-xs text-red-400">{email?.message}</span>
            )}
          </div>
          <div className="w-full space-y-2 mb-6 relative">
            <label className="block text-sm font-semibold text-black">
              Pesan
            </label>
            <span
              className={`absolute right-4 text-sm text-slate-400 ${
                message?.isError ? 'border-red-400 bottom-10' : 'bottom-4 '
              }`}
            >
              {countChar}/80
            </span>
            <textarea
              className={`appearance-none border rounded w-full py-2 px-3 focus:outline-none ${
                message?.isError && 'border-red-400'
              }`}
              id="message"
              placeholder="Pesan..."
              value={message?.value}
              onBlur={(event) => {
                onChangeMessage(event.target.value.trim().replace(/\s+/g, ' '));
              }}
              onChange={(event) => onChangeMessage(event.target.value)}
              maxLength={80}
            />
            {message?.isError && (
              <span className="text-xs text-red-400">{message?.message}</span>
            )}
          </div>
          <div className="w-full mb-6">
            <button
              type="submit"
              disabled={!name?.value || !email?.value || !message?.value}
              className={`w-full py-2 ${
                name?.value && email?.value && message?.value
                  ? 'bg-emerald-500 hover:bg-emerald-400'
                  : 'bg-slate-300'
              } ${
                name?.value && email?.value && message?.value
                  ? 'text-white'
                  : 'text-slate-400'
              } rounded`}
            >
              {'Submit'}
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
