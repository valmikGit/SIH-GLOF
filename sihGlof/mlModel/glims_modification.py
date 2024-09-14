from dataframe import gdf
import geopandas as gpd
import seaborn as sns
import matplotlib.pyplot as plt

def plot_column(column_name):
    # Create a new figure before plotting
    plt.figure(figsize=(10, 10))
    sns.boxplot(gdf[column_name])
    plt.title(f"Boxplot of {column_name}")
    
    # Save the figure
    plt.savefig(f"{column_name}.png")
    
    # Close the plot to prevent overlap when plotting multiple columns
    plt.close()

def plot_all():
    for i in list(gdf.columns):
        plot_column(i)

def outlier_check(column_name):
    # Calculate Q1 (25th percentile) and Q3 (75th percentile)
    Q1 = gdf[column_name].quantile(0.25)
    Q3 = gdf[column_name].quantile(0.75)
    
    # Calculate Interquartile Range (IQR)
    IQR = Q3 - Q1
    
    # Define outlier range
    lower_bound = Q1 - 1.5 * IQR
    upper_bound = Q3 + 1.5 * IQR
    
    # Identify outliers
    outliers = gdf[(gdf[column_name] < lower_bound) | (gdf[column_name] > upper_bound)]
    
    print(f"Outliers in {column_name}:")
    print(outliers[[column_name]])
    
    return outliers

def plot_all_with_outlier_check(columns_to_check):
    # Iterate through the columns to check for outliers and plot boxplots
    for column in columns_to_check:
        print(f"Plotting and checking for outliers in {column}")
        # plot_column(column)
        outlier_check(column)

columns_to_check = ['area', 'db_area', 'length', 'max_elev', 'mean_elev', 'min_elev', 'width']
plot_all()
plot_all_with_outlier_check(columns_to_check)
