import cv2 as cv
import numpy as np
import tensorflow as tf

# usefull data
width = 224
height = 224

target_size = (width, height)
input_shape = (width, height, 3)

diseases = ["Anthracnose", "Bacterial Wilt",
            "Downy Mildew", "Gummy Stem Blight", "Fresh Leaf"]

# loading model
model = tf.keras.models.load_model(
    'models/cucumber_detector_transfer_learned.h5')
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
            'Anthracnose': str(prediction[0][0]*100),
            'Bacterial Wilt': str(prediction[0][1]*100),
            'Downy Mildew': str(prediction[0][2]*100),
            'Gummy Stem Blight': str(prediction[0][3]*100),
            'Fresh Leaf': str(prediction[0][4]*100)
        },
        'original': str(valueList),
        "maximumPercentage": str(maximumValue),
        "identified": str(predictedDisease),
        "identifiedPercentage": diseasePercentage,
        "itemWithMaxPercentage": str(diseaseWithMaxPercentage),
        "type": "disease",
        "varient": "cucumber"

    }

    return output
