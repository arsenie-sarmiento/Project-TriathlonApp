// // import { useState } from "react"
// import PropTypes from "prop-types"

// FileHandlerComponent.propTypes = {
//   onProcess: PropTypes.func
// }

// export default function FileHandlerComponent({ onProcess }) {

//   function init() {
//     let fileHandle // Variable to store file handle

//     // Options for opening and saving files
//     const openOptions = {
//       types: [
//         {
//           description: "Text Files",
//           accept: {
//             "text/plain": [".txt",".js"],
//           },
//         },
//       ],
//       excludeAcceptAllOption: true,
//       multiple: false, // Allow only one file to be selected
//     }

//     const createFile = () => {
//       // Event listener for creating a new file
//       // document
//       //   .getElementById("createFileBtn")
//       //   .addEventListener("click", () => {
//           // Show file save dialog and get file handle
//           fileHandle = window.showSaveFilePicker(openOptions)
//           // Write empty content to the file
//           writeFile(fileHandle, "")
//         // })
//     }

//     const openFile = () => {
//       // Event listener for opening an existing file
//       // document
//       //   .getElementById("openFileBtn")
//       //   .addEventListener("click", () => {
//           // Show file open dialog and get file handle
//           ;[fileHandle] = window.showOpenFilePicker(openOptions)
//           // Read file content and display it
//           const file = fileHandle.getFile()
//           const fileContent = file.text()
//           document.getElementById("fileContent").value = fileContent
//         // })
//     }
       
//     const saveFile = () => {
//     // Event listener for saving changes to the file
//     // document
//     //   .getElementById("saveFileBtn")
//     //   .addEventListener("click", () => {
//         // Make a writable stream from the handle.
//         const writable = fileHandle.createWritable()
//         // Write the contents of the file to the stream.
//         writable.write(document.getElementById("fileContent").value)
//         // Close the file and write the contents to disk.
//         writable.close()
//       // })
//     }

//     const deleteFile = () => {
//       // Event listener for deleting the file
//       // document
//       //   .getElementById("deleteFileBtn")
//       //   .addEventListener("click", () => {
//           // Remove the file
//           // fileHandle.removeEntry()
//           fileHandle.remove()
//           // Clear the textarea
//           document.getElementById("fileContent").value = ""
//         // })
//     }


//     // Function to write content to a file
//     const writeFile = (fileHandle, content) => {
//       // Create a writable stream to the file
//       const writable = fileHandle.createWritable()
//       // Write content to the file
//       writable.write(content)
//       // Close the writable stream
//       writable.close()
//     }
//   }
  
//   // Initialize the application
//   init()

//   // const handleFileOperation = (operation) => {
//   //   // onProcess(operation)
//   //   const operationCall = {
//   //     "create": createFile,
//   //     "open": openFile,
//   //     "save": saveFile,
//   //     "delete": deleteFile,
//   //   }
//   //   // console.log(operation)
//   //   operationCall[operation]
//   // }

//   return ( 
//     <div className="m-5">
//       <h2>Triathlon Notes</h2>
//       <p>Write notes about the training</p>
//       <textarea id="fileContent" rows="10" cols="50"></textarea>
//       <br/>
//       <button id="createFileBtn" onClick={createFile()}>Create File</button>
//       <button id="openFileBtn" onClick={openFile()}>Open File</button>
//       <button id="saveFileBtn" onClick={saveFile()}>Save File</button>
//       <button id="deleteFileBtn" onClick={deleteFile()}>Delete File</button>
//       {/* <button id="createFileBtn" onClick={() => handleFileOperation("create")}>Create File</button> */}
//       {/* <button id="openFileBtn" onClick={() => handleFileOperation("open")}>Open File</button> */}
//       {/* <button id="saveFileBtn" onClick={() => handleFileOperation("save")}>Save File</button> */}
//       {/* <button id="deleteFileBtn" onClick={() => handleFileOperation("delete")}>Delete File</button> */}
//     </div>
//   )
// }
  
 