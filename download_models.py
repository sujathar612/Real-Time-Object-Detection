import urllib.request

prototxt_url = "https://raw.githubusercontent.com/opencv/opencv_extra/master/testdata/dnn/MobileNetSSD_deploy.prototxt"
caffemodel_url = "https://github.com/opencv/opencv_3rdparty/raw/dnn_samples_face_detector_20170830/MobileNetSSD_deploy.caffemodel"

def download_file(url, filename):
    print(f"Downloading {filename}...")
    urllib.request.urlretrieve(url, filename)
    print(f"{filename} downloaded.")

if __name__ == "__main__":
    download_file(prototxt_url, "MobileNetSSD_deploy.prototxt")
    download_file(caffemodel_url, "MobileNetSSD_deploy.caffemodel")
