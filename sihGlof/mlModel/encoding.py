import chardet

# Read the first 1000 bytes of the file to guess the encoding
with open('HMAGLOFDB-v1.1.0/fidelsteiner-HMAGLOFDB-19d686a/Database/GLOFs/HMAGLOFDB.csv', 'rb') as f:
    result = chardet.detect(f.read(1000))
    print(result)  # {'encoding': 'ISO-8859-1', 'confidence': 0.99}

