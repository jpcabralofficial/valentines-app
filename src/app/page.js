/** @format */

'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Modal from 'react-modal';
const initial = {
  top: '50%',
  left: '57%',
  transform: 'translate(-50%, -50%)',
};
export default function Home() {
  const [noButtonPos, setNoButtonPos] = useState(initial);
  const [hasMoved, setHasMoved] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const images = [
    '/8bb10252-2d84-474e-adad-c11b654dcb1e.avif',
    '/8bb10252-2d84-474e-adad-c11b654dcb1e.avif',
    '/23b309cc90607f6ac70ff5af6ddcf7a7.jpg',
    '/caa6101a8171dc5600480e623c48634b.jpg',
    '/caa6101a8171dc5600480e623c48634b.jpg',
  ];
  const [randomImage, setRandomImage] = useState(images[0]);

  const moveNoButton = () => {
    const newTop = Math.random() * 90 + '%';
    const newLeft = Math.random() * 90 + '%';
    setNoButtonPos({ top: newTop, left: newLeft, transform: 'none' });

    setShowImage(true);
    let newImage;
    do {
      newImage = images[Math.floor(Math.random() * images.length)];
    } while (newImage === randomImage);

    setRandomImage(newImage);
  };
  useEffect(() => {
    Modal.setAppElement(document.body); // Attach modal to body dynamically
  }, []);

  return (
    <div className='flex flex-col justify-center items-center h-screen bg-pink-200'>
      <h1 className='text-4xl font-bold text-red-600 mb-6 text-center w-full'>
        Will you be my Valentine? ❤️
      </h1>
      <div className=' flex flex-row w-full justify-center items-center content-center p-10'>
        {/* Yes Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className='px-8 py-3 text-xl font-semibold text-white bg-green-500 rounded-lg shadow-lg hover:bg-green-600 transition '>
          Yes!
        </button>

        {/* No Button */}
        <button
          onMouseEnter={moveNoButton}
          onClick={moveNoButton}
          className='absolute px-10 py-3 text-xl font-semibold text-white bg-red-500 rounded-lg shadow-lg hover:bg-red-600 transition'
          style={{
            top: noButtonPos.top,
            left: noButtonPos.left,
            transform: noButtonPos.transform,
            position: 'absolute',
            transition: 'top 0.3s, left 0.3s, transform 0.3s',
          }}>
          No
        </button>
      </div>

      {/* Show random image after first No button click */}

      {!isModalOpen && (
        <div className='mt-6 '>
          <Image
            src={randomImage}
            alt='Funny Reaction'
            width={300}
            height={300}
            className='rounded-lg shadow-lg'
          />
        </div>
      )}

      {/* Modal for "Yes" button */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
        <div className='bg-white p-6 rounded-lg shadow-lg text-center'>
          <h2 className='text-3xl font-bold text-pink-600'>YAY! ❤️</h2>
          <p className='text-lg text-gray-700 mt-2'>
            See you on Valentine's Day!
          </p>
          <Image
            src='/598abac1a33211949014d2d4b1149def.jpg'
            alt='Celebration'
            width={300}
            height={300}
            className='rounded-lg mt-4 shadow-md'
          />
          <button
            onClick={() => {
              setNoButtonPos(initial);
              setIsModalOpen(false);
            }}
            className='mt-4 px-5 py-2 text-lg bg-pink-500 text-white rounded-lg shadow-md hover:bg-pink-600 transition'>
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}
