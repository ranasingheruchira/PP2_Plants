import cv2 as cv
import numpy as np
import tensorflow as tf

# usefull data
width = 224
height = 224

target_size = (width, height)
input_shape = (width, height, 3)

# loading model
model = tf.keras.models.load_model('models/cucumber_detector_transfer_learned.h5')
model.compile(
            optimizer=tf.keras.optimizers.Adam(learning_rate=0.0001), 
            loss='categorical_crossentropy', 
            metrics=[
                tf.keras.metrics.CategoricalAccuracy(name='accuracy'),
                tf.keras.metrics.Precision(name='precision'),
                tf.keras.metrics.Recall(name='recall'),
                tf.keras.metrics.AUC(name='auc')
            ])

# prediction function definition
def analyze_cucumber_leaf(image_path):
    img = cv.imread(image_path)
    img = cv.cvtColor(img, cv.COLOR_BGR2RGB)
    img = cv.resize(img, (width, height))
    img = np.expand_dims(img, axis=0)
    img = tf.keras.applications.inception_resnet_v2.preprocess_input(img)
    prediction = model.predict(img)
    
    output = {
        'prediction':{
            'Anthracnose' : str(prediction[0][0]),
            'Bacterial Wilt' : str(prediction[0][1]),
            'Downy Mildew' : str(prediction[0][2]),
            'Gummy Stem Blight' : str(prediction[0][3]),
            'Fresh Leaf' : str(prediction[0][3])
        },

        'original':str(prediction[0])
    }
    
    return output
