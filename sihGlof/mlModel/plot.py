import geopandas as gpd
import matplotlib.pyplot as plt

# Load the shapefiles
gdf_polygons = gpd.read_file('~/GLOF/NSIDC-0272_glims_db_south_20240603_v01.0/glims_download_66118/glims_polygons.shp')
gdf_images = gpd.read_file('~/GLOF/NSIDC-0272_glims_db_south_20240603_v01.0/glims_download_66118/glims_images.shp')

# Set up the plot
fig, ax = plt.subplots(figsize=(10, 8))

# Plot the polygons
gdf_polygons.plot(ax=ax, color='lightblue', edgecolor='black', linewidth=1, alpha=0.5, label='Polygons')

# Plot the images or points on top of the polygons
gdf_images.plot(ax=ax, color='red', marker='o', markersize=5, label='Images')

# Add title and labels
ax.set_title('Geospatial Data Visualization', fontsize=15)
ax.set_xlabel('Longitude')
ax.set_ylabel('Latitude')

# Add a legend
plt.legend()

# Show the plot
plt.show()

