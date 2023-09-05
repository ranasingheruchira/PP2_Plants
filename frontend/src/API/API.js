//getting image analysis results from the server
export async function upload(formData, url, callback) {
  try {
    const response = await fetch(`http://127.0.0.1:5000/${url}`, {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    console.log("Result", result);
    callback(result);
  } catch (error) {
    console.log("Error :", error);
  }
}
