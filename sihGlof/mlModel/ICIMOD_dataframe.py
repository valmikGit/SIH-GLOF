import pandas as pd
import matplotlib.pyplot as plt

def csv_dataframe(file_name):
    df = pd.read_csv(file_name, encoding='ISO-8859-1')
    print(df.head())
    print(df.columns)
    for i in list(df.columns):
        print(df[i][:10])

def shapefile_filtering(file_name, column_name, filter_name):
    gdf = pd.read_csv(file_name, encoding='ISO-8859-1')
    gdf_filtered = gdf[gdf[column_name] == filter_name]
    print(gdf_filtered)
    print(gdf_filtered.isna().sum())

# csv_dataframe('HMAGLOFDB-v1.1.0/fidelsteiner-HMAGLOFDB-19d686a/Database/GLOFs/HMAGLOFDB.csv')
shapefile_filtering('HMAGLOFDB-v1.1.0/fidelsteiner-HMAGLOFDB-19d686a/Database/GLOFs/HMAGLOFDB.csv', 'Lake_type', 'Moraine dammed')