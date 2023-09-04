import { useRef, useState } from "react";
import { upload } from "../API/API";
import CustomizedDialogs from "./Dialog";

let data = {};

export default function InputForm() {
  //selects <input> tag from html
  const imageInput = useRef();

  //state of the components
  const [isOpen, changeIsOpen] = useState(false);

  //form submit handler
  const onSubmit = function (event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("img", imageInput.current.files[0]);
    upload(formData, changePredictionData);
  };

  //this is used to change the data in the pop up message

  const changePredictionData = function (newData) {
    data = newData;
    changeIsOpen(true);
  };

  return (
    <div>
      <CustomizedDialogs
        isOpen={isOpen}
        changeIsOpen={changeIsOpen}
        data={data}
      />
      <form onSubmit={onSubmit}>
        <h1>{isOpen.toString()}</h1>
        <label>Potato Leaf Image</label>
        <input type="file" accept="image/*" ref={imageInput} id="test" />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
