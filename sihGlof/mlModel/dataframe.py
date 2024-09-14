import geopandas as gpd
import matplotlib.pyplot as plt
import pandas as pd

def shapefile_dataframe(file_name, ax=None):
    # Read shapefile
    gdf = gpd.read_file(file_name)
    print(gdf.head())
    print(gdf.crs)
    # Plot shapefile data on the provided axis (or create a new one)
    if ax is None:
        ax = gdf.plot()
    else:
        gdf.plot(ax=ax)
    return ax

def shapefile_filtering(file_name, column_name, filter_name):
    # Read shapefile and filter based on a column value
    gdf = gpd.read_file(file_name)
    gdf_filtered = gdf[gdf[column_name] == filter_name]
    print(gdf_filtered.head())

def shapefile_column_details(gdf, column_name):
    # Get unique values of a column in a shapefile
    print(list(set(gdf[column_name])))

def drop_columns(file_name, column_names):
    gdf = gpd.read_file(file_name)
    print(gdf.columns)
    gdf.drop(columns = column_names, inplace=True)
    print(gdf.columns)
    print(gdf.head())
    for i in list(gdf.columns):
        print(i, list(set(gdf[i]))[:5])
    
def csv_dataframe(file_name):
    # Read CSV and print column details
    df = pd.read_csv(file_name)
    print(df.head())
    print(df.columns)

# List of shapefiles to plot
file_names = [
    'NSIDC-0272_glims_db_south_20240603_v01.0/glims_download_66118/glims_images.shp',
    'NSIDC-0272_glims_db_south_20240603_v01.0/glims_download_66118/glims_lines.shp',
    'NSIDC-0272_glims_db_south_20240603_v01.0/glims_download_66118/glims_points.shp',
    'NSIDC-0272_glims_db_south_20240603_v01.0/glims_download_66118/glims_polygons.shp'
]

columns = ['wgms_id', 'local_id', 'subm_id', 'release_dt', 'proc_desc', 'rc_id', 'chief_affl', 'analysts', 'rec_status', 'glac_stat', 'gone_date', 'gone_dt_e', 'submitters']
drop_columns('NSIDC-0272_glims_db_south_20240603_v01.0/glims_download_66118/glims_polygons.shp', columns)
# Create a new plot with Matplotlib
fig, ax = plt.subplots(figsize=(10, 10))

# Plot all shapefiles on the same axis
for i in file_names:
    ax = shapefile_dataframe(i, ax=ax)

plt.savefig("combined.png")
# Show the combined plot
plt.show()
