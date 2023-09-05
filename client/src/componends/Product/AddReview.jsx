import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { AddNewReview } from "../../redux/reducers/Admin/Review/ReviewAction";
import { toast } from "react-toastify";
const AddReview = ({ isOpen, setIsOpen }) => {
  let [rating, setRating] = useState(1);
  const [review, setReview] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const handleSubmit = () => {
    const data = { id, review: review, rating: rating };
    console.log(data);
    dispatch(AddNewReview(data)).then(() =>
      toast.success("thank you for review", {
        position: toast.POSITION.BOTTOM_CENTER,
      })
    );
    setIsOpen(false);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const reviewInput = (e) => {
    setReview(e.target.value);
  };
  // console.log(review);
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add Review
                  </Dialog.Title>
                  <div className="mt-2 flex gap-3 flex-col">
                    <div>
                      <Rating
                        name="simple-controlled"
                        className="flex gap-3 "
                        value={rating}
                        onChange={(event, newValue) => {
                          setRating(newValue);
                        }}
                      />
                    </div>

                    <div>
                      <TextField
                        id="outlined-multiline-flexible"
                        className=" w-4/5"
                        label="your review"
                        onChange={reviewInput}
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-5 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-5 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AddReview;
