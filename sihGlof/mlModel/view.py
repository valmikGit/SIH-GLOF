import geopandas as gpd
import matplotlib.pyplot as plt
# Load the shapefile
gdf = gpd.read_file("~/GLOF/NSIDC-0272_glims_db_south_20240603_v01.0/glims_download_66118/glims_polygons.shp")
# View the data
print(gdf.columns)

#gdf.plot()
#plt.title("Geospatial Data Visualization")
#plt.xlabel("Longitude")
#plt.ylabel("Latitude")

#plt.savefig("polygons.png")# Show the plot
