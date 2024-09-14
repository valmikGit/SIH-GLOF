import geopandas as gpd
import matplotlib.pyplot as plt
import pandas as pd

def shapefile_dataframe(file_name):
    gdf = gpd.read_file(file_name)
    print(gdf.head())
    print(gdf.crs)
    gdf.plot()
    plt.show()
    print(gdf.columns)
    for i in list(gdf.columns):
        print((gdf[i])[:5])
    
def shapefile_filtering(file_name, column_name, filter_name):
    gdf = gpd.read_file(file_name)
    gdf_filtered = gdf[gdf[column_name] == filter_name]
    print(gdf_filtered.head())

def shapefile_column_details(file_name, column_name):
    gdf = gpd.read_file(file_name)
    print(list(set(gdf[column_name])))

def csv_dataframe(file_name):
    df = pd.read_csv(file_name)
    print(df.head())
    print(df.columns)

# file_names = ['NSIDC-0272_glims_db_south_20240603_v01.0/glims_download_66118/glims_images.shp', 'NSIDC-0272_glims_db_south_20240603_v01.0/glims_download_66118/glims_lines.shp', 'NSIDC-0272_glims_db_south_20240603_v01.0/glims_download_66118/glims_points.shp', 'NSIDC-0272_glims_db_south_20240603_v01.0/glims_download_66118/glims_polygons.shp']
# for i in file_names:
#     shapefile_dataframe(i)
# csv_dataframe('NSIDC-0272_glims_db_south_20240603_v01.0/glims_download_66118/glims_hypsometry_50.csv')
shapefile_column_details('NSIDC-0272_glims_db_south_20240603_v01.0/glims_download_66118/glims_polygons.shp', 'geog_area')
shapefile_filtering('NSIDC-0272_glims_db_south_20240603_v01.0/glims_download_66118/glims_polygons.shp', 'geog_area', 'India')