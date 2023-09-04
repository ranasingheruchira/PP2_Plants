from flask import Flask
from flask import request
from flask import jsonify
import tempfile
import os
from potato_leaf import analyze_potato_leaf

app = app = Flask(__name__,
            static_url_path='', 
            static_folder='static',
            template_folder='templates')

# potato API
@app.route("/potato",methods=["POST","GET"])
def potato():

    image = request.files.get('img')
    temp_dir = tempfile.mkdtemp()

    try:
        temp_file_path = os.path.join(temp_dir, image.filename)
        image.save(temp_file_path)

        # getting results from potato model
        result = analyze_potato_leaf(temp_file_path)

        os.remove(temp_file_path)
    
    finally:
        os.rmdir(temp_dir)
    
    return jsonify(result)


