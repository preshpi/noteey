import { FeedbackModalProps } from "@/app/types/components/Modals/FeedbackModal";
import { NextPage } from "next";
import React, { useRef, useState } from "react";
import Overlay from "../Overlay";
import { MdClose } from "react-icons/md";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import { useAppContext } from "@/app/context/AppContext";
import useModalAnimation from "./useModalAnimation";

const FeedbackModal: NextPage<FeedbackModalProps> = ({ show, setShow }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<{ message: string }>({
    message: "",
  });
  const feedbackModalRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const cancelModal = () => {
    setShow(false);
  };
  const { color } = useAppContext();

  const background = color || "#e85444";
  const backgroundStyle = { backgroundColor: background };
  const animateCom = useRef(null);
  useModalAnimation(animateCom);

  const handleSendFeedback = (e: any) => {
    e.preventDefault();

    if (!formData.message) {
      toast.error("Field shouldn't be empty!");
    } else {
      const formElement = formRef.current;

      if (formElement) {
        emailjs
          .sendForm(
            "service_aakyhrk",
            "template_p5ls11n",
            formElement,
            process.env.NEXT_PUBLIC_EMAIL_API_KEY
          )
          .then(
            (result) => {
              toast.success(result.text);
              setIsLoading(true);
              setShow(false);
            },
            (error) => {
              toast.error(error.text);
            }
          );
      } else {
        toast.error("Form element is not available.");
      }
    }
  };

  return (
    <Overlay show={show} setShow={setShow} modalRef={feedbackModalRef}>
      {show && (
        <div
          ref={animateCom}
          id="box"
          className="max-w-[405px] m-10 w-full dark:bg-[#1f1f1f] bg-[#EAEAEA] rounded-lg shadow-lg h-auto max-h-[500px] overflow-auto"
        >
          <div className="p-5 dark:text-[#eee] text-[#131313]">
            <div className="flex justify-between items-center text-2xl">
              <p className="font-semibold tracking-tight">Send us a feedback</p>
              <button onClick={cancelModal}>
                <MdClose />
              </button>
            </div>

            <p className="text-x pt-3">
              Bugs? Honest feedback would be appreciated. You can also send new
              features you want us to add.
            </p>
            <form
              ref={formRef}
              onSubmit={handleSendFeedback}
              className="flex flex-col gap-5 pt-5"
            >
              <textarea
                value={formData.message}
                name="message"
                id="message"
                required
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    message: e.target.value,
                  });
                }}
                className="p-4 text-sm h-32 rounded-lg border focus:outline-none dark:bg-[#1f1f1f] bg-[#EAEAEA] dark:border-[#3D3D3D] border-[#C2C2C2] dark:text-[#eee] text-text"
                placeholder="Let us know the issue..."
                disabled={isLoading}
              ></textarea>
              <div className="flex justify-end gap-5">
                <button
                  onClick={cancelModal}
                  className="px-4 py-2 rounded-lg transition-all duration-300 hover:bg-[#eee] dark:hover:bg-[#1d1d1d] border border-[#3D3D3D] dark:border-[#C2C2C2]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  style={backgroundStyle}
                  className="px-4 py-2 rounded-lg text-black hover:opacity-70 transition-all duration-300 disabled:bg-opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "loading..." : "Send"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Overlay>
  );
};

export default FeedbackModal;
