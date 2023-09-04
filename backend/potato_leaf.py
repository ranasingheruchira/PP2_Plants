import cv2 as cv
import tensorflow as tf
import numpy as np

#required parameters
width = 224
height = 224

# target image size
target_size = (width, height)

#loading models
model = tf.keras.models.load_model('models/potato-identificationnewV2.h5')

#image preprocessing function
def preprocessing_function(img):
    img = tf.keras.applications.inception_resnet_v2.preprocess_input(img)
    return img

# image recognition model function
def analyze_potato_leaf(file_directory):

    img = cv.imread(file_directory)
    img = cv.resize(img, target_size)
    img = preprocessing_function(img)
    img = np.expand_dims(img, axis=0)
    prediction = model.predict(img) #calling the model
    
    output = {
        'prediction':{
            'healthy' : str(prediction[0][1]),
            'early' : str(prediction[0][0]),
            'late' : str(prediction[0][2])
        },

        'original':str(prediction)
    }

    return output