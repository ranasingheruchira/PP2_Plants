import { useRef, useState } from "react";
import { upload } from "../API/API";
import PopUpDialog from "./PopUpDialog";
import styles from "./InputForm.module.css";

let data = {};

export default function InputForm() {
  //selects <input> tag from html document
  const imageInput = useRef();

  //state of the components
  const [isSumbitted, changeIsSubmitted] = useState(false);
  const [fileName, changeFileName] = useState("Click to Add Image");
  const [radioURL, changeRadioURL] = useState("potato");

  //form submit handler
  const onSubmit = function (event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("img", imageInput.current.files[0]);
    upload(formData, radioURL, changePredictionData); //sends data to server
  };

  //this is used to change the data in the pop up message
  //also loads the pop up message once data is recieved from the server

  const changePredictionData = function (newData) {
    data = newData;
    changeIsSubmitted(true);
  };

  //this is used to display the selected image name on the form
  const imageAddHandler = function (event) {
    let filePath = event.target.value.split("\\");
    let fileName = filePath[filePath.length - 1];
    changeFileName(fileName);
  };

  //used to change the url path depending on optato, cucumber or weed
  const onRadioChange = function (event) {
    changeRadioURL(event.target.value);
  };

  return (
    <div id="input_form_div">
      {isSumbitted && ( //checks user submitted the form or not. If submitted pop up appears
        <PopUpDialog
          isOpen={isSumbitted}
          changeIsOpen={changeIsSubmitted}
          data={data}
        />
      )}
      <form onSubmit={onSubmit}>
        <label className={styles.form_label}>Detection Type :</label>
        <br />

        {/* radio group for selecting potato,cucumber or weed*/}
        <div className={styles.radio_group}>
          <label className={styles.container}>
            Potato
            <input
              type="radio"
              name="radio"
              onChange={onRadioChange}
              value="potato"
            />
            <span className={styles.checkmark}></span>
          </label>
          <label className={styles.container}>
            Cucumber
            <input
              type="radio"
              name="radio"
              onChange={onRadioChange}
              value="cucumber"
            />
            <span className={styles.checkmark}></span>
          </label>
          <label className={styles.container}>
            Weed
            <input
              type="radio"
              name="radio"
              onChange={onRadioChange}
              value="weed"
            />
            <span className={styles.checkmark}></span>
          </label>
        </div>
        <br />

        {/* "Add Image Here" Label */}
        <label className={styles.form_label} id={styles.from_label_image}>
          Add Image Here :
        </label>
        <br />
        {/* Image upload area */}
        <div className={styles.image_input_container}>
          <label
            htmlFor={styles.input_image}
            className={styles.add_Image_label}
          >
            {fileName}
          </label>
          <input
            type="file"
            accept="image/*"
            ref={imageInput}
            id={styles.input_image}
            onChange={imageAddHandler}
          />
        </div>
        {/* Submit Button */}
        <br />
        <input type="submit" value="Submit" className={styles.btn_submit} />
      </form>
    </div>
  );
}
