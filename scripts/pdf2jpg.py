import tkinter as tk
from tkinter import filedialog
from pdf2image import convert_from_path

def app():
    # Create a tkinter window
    root = tk.Tk()
    root.withdraw()

    # Select a PDF file using a file dialog
    file_path = filedialog.askopenfilename()
    root.destroy()

    # Get the page number to convert to an image
    page_num = int(input("Enter the page number to convert to an image: "))

    # Convert the page to an image in JPEG format using pdf2image
    print("Converting...")
    images = convert_from_path(file_path, first_page=page_num, last_page=page_num)
    image = images[0]
    print("Done!")

    # Ask the user to select a location and name for the output image file
    save_path = filedialog.asksaveasfilename()

    # Save the image in JPEG format
    image.save(save_path, 'JPEG', quality=95)

if __name__ == '__main__':
    app()