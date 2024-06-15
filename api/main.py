from fastapi import FastAPI, File, UploadFile
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image 
import tensorflow as tf

import os

app = FastAPI() 

MODEL_PATH = os.path.join(os.path.dirname(__file__), '..', 'models', '1.keras')
MODEL = tf.keras.models.load_model(MODEL_PATH)

CLASS_NAMES = ["Early Blight", "Late Blight", "Healthy"] 

@app.get("/ping")
async def ping():
    return "Hello from ping."  

def read_file_as_image(data) -> np.ndarray:
    image = np.array(Image.open(BytesIO(data)))
    return image

@app.post("/predict")
async def predict(
    file: UploadFile = File(...)
):
    image = read_file_as_image(await file.read())
    img_batch = np.expand_dims(image, 0)

    predictions = MODEL.predict(img_batch) 
    idx = np.argmax(predictions[0])
    predicted_class = CLASS_NAMES[idx]
    confidence = np.max(predictions[0])
    
    return {
        'class': predicted_class, 
        'confidence': float(confidence)
    } 

if __name__ == "__main__":
    uvicorn.run(app, host='localhost', port = 8000)