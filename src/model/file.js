export default class File {
    constructor() {
        this.fileHandle
        this.openOptions = {
        types: [
            {
            description: "Text Files",
            accept: {
                "text/plain": [".txt",".js"],
            },
            },
        ],
        excludeAcceptAllOption: true,
        multiple: false, // Allow only one file to be selected
        }
    }

    call(operation) {
    const operationCall = {
        "create": this.createFile.bind(this),
        "open": this.openFile.bind(this),
        "save": this.saveFile.bind(this),
        "delete": this.deleteFile.bind(this),
    }
    // console.log(operation)
    operationCall[operation]
    }

    // Event listener for creating a new file
    createFile() {
        // Show file save dialog and get file handle
        this.fileHandle = window.showSaveFilePicker(this.openOptions)
        // Write empty content to the file
        this.writeFile(this.fileHandle, "")
    }

      // Event listener for opening an existing file
    openFile() {
        console.log('opening')
        // Show file open dialog and get file handle
        this.fileHandle = window.showOpenFilePicker(this.openOptions)
        // Read file content and display it
        const file = this.fileHandle.getFile()
        const fileContent = file.text()
        document.getElementById("fileContent").value = fileContent        
    }

    // Event listener for saving changes to the file
    saveFile() {
      // Make a writable stream from the handle.
      const writable = this.fileHandle.createWritable()
      // Write the contents of the file to the stream.
      writable.write(document.getElementById("fileContent").value)
      // Close the file and write the contents to disk.
      writable.close()
    }
    
    // Event listener for deleting the file
    deleteFile () {
      // Remove the file
      this.fileHandle.removeEntry()
      this.fileHandle.remove()
      // Clear the textarea
      document.getElementById("fileContent").value = ""
    }
  
      // Function to write content to a file
    writeFile(fileHandle, content) {
        // Create a writable stream to the file
        const writable = fileHandle.createWritable()
        // Write content to the file
        writable.write(content)
        // Close the writable stream
        writable.close()
      }
}