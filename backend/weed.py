# importing packages
import cv2 as cv
import numpy as np
import tensorflow as tf

# usefull data
width = 128
height = 128

target_size = (width, height)
input_shape = (width, height, 3)

weeds = ["Charlock", "Common Chickweed",
         " Fat Hen", "Loose Silky-bent", "Scentless Mayweed", "Small-flowered Cranesbill"]

# loading model
model = tf.keras.models.load_model('models/weed-identification-pretrained.h5')

# preprocessing function


def preprocessing_function(img):
    img = tf.keras.applications.xception.preprocess_input(img)
    return img

# prediction function definition


def analyze_weed_image(image_path):
    img = cv.imread(image_path)
    img = cv.resize(img, target_size)
    img = preprocessing_function(img)
    img = np.expand_dims(img, axis=0)
    prediction = model.predict(img)

    valueList = list(prediction[0])
    maximumValue = max(valueList)
    indexOfMax = valueList.index(maximumValue)

    # values to be returned by API
    maximumValue = maximumValue*100
    predictedWeed = "Unidentified Image"
    weedPercentage = "Unidentified Percentage"
    weedWithMaxPercentage = weeds[indexOfMax]

    # only returns values with more than 65% accuracy
    if maximumValue >= 65:
        predictedWeed = weeds[indexOfMax]
        weedPercentage = str(maximumValue)

    output = {
        'prediction': {
            'Charlock': str(prediction[0][0]*100),
            'Common Chickweed': str(prediction[0][1]*100),
            'Fat Hen': str(prediction[0][2]*100),
            'Loose Silky-bent': str(prediction[0][3]*100),
            'Scentless Mayweed': str(prediction[0][4]*100),
            'Small-flowered Cranesbill': str(prediction[0][5]*100)
        },
        'original': str(valueList),
        "maximumPercentage": str(maximumValue),
        "identified": str(predictedWeed),
        "identifiedPercentage": weedPercentage,
        "itemWithMaxPercentage": str(weedWithMaxPercentage),
        "type": "disease",
        "varient": "cucumber"

    }

    return output
