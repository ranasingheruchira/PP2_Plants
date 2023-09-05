import cv2 as cv
import tensorflow as tf
import numpy as np

# required parameters
width = 224
height = 224

diseases = ['Early Blight Disease', 'Late Blight Disease', 'Healthy']

# target image size
target_size = (width, height)

# loading models
model = tf.keras.models.load_model('models/potato-identificationnewV2.h5')

# image preprocessing function


def preprocessing_function(img):
    img = tf.keras.applications.inception_resnet_v2.preprocess_input(img)
    return img

# image recognition model function


def analyze_potato_leaf(file_directory):

    img = cv.imread(file_directory)
    img = cv.resize(img, target_size)
    img = preprocessing_function(img)
    img = np.expand_dims(img, axis=0)
    prediction = model.predict(img)  # calling the model

    valueList = list(prediction[0])
    maximumValue = max(valueList)
    indexOfMax = valueList.index(maximumValue)

    # values to be returned by API
    maximumValue = maximumValue*100
    predictedDisease = "Unidentified"
    diseasePercentage = "Unidentified"
    diseaseWithMaxPercentage = diseases[indexOfMax]

    # only returns values with more than 65% accuracy
    if maximumValue >= 65:
        predictedDisease = diseases[indexOfMax]
        diseasePercentage = str(maximumValue)

    output = {
        'prediction': {
            'Early Blight Disease': str(prediction[0][0]*100),
            'Late Blight Disease': str(prediction[0][1]*100),
            'Healthy Leaf': str(prediction[0][2]*100)
        },

        'original': str(valueList),
        "maximumPercentage": str(maximumValue),
        "identified": str(predictedDisease),
        "identifiedPercentage": diseasePercentage,
        "itemWithMaxPercentage": str(diseaseWithMaxPercentage),
        "type": "disease",
        "varient": "potato"
    }

    return output
