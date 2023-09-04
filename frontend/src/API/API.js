//getting potato analysis from the server
export async function upload(formData, callback) {
  try {
    const response = await fetch("http://127.0.0.1:5000/potato", {
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
