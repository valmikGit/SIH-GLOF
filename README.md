# GLOF Early Warning System
## Preprocessing for the ML model:
- DataFrame Creation
The first step involved creating a dataframe from the raw data. This data came from shapefiles (geospatial data). The dataframe serves as a structured format where each column represents a feature or attribute, and each row corresponds to an entry in the dataset. At this stage, we ensured that the data was loaded correctly into a pandas dataframe, which provides flexibility for subsequent filtering and analysis.
- Shapefiles Filtering and Preprocessing 
Shapefiles, which contain geospatial data in vector format (polygons, lines, and points), were loaded and filtered to remove irrelevant data or focus on specific areas of interest. This filtering step involved selecting specific geographic regions, features, or attribute values from the shapefiles. Additionally, preprocessing included cleaning the shapefile data by fixing any projection issues (e.g., reprojecting to a consistent coordinate system), handling missing geometries, and ensuring the attribute columns were in the correct format for analysis. 
- Dropping Rows and Columns
To further clean the data, unnecessary rows and columns were removed. Rows were dropped based on specific criteria such as missing values, irrelevant data points, or outliers that might distort the analysis. Similarly, columns that did not contribute meaningfully to the analysis were dropped. This step helped in simplifying the dataset, reducing complexity, and focusing on the most relevant information for the analysis.
- Outlier Check
Detecting and handling outliers was a crucial step to ensure the integrity of the analysis. Outliers in numerical columns were identified by statistical methods such as Z-score, IQR (Interquartile Range), or visual methods like boxplots. Once identified, these outliers were either removed or addressed (depending on the context), as they could potentially skew the results. The goal was to ensure the data was robust and not influenced by extreme or anomalous values.
- Plotting Polygons, Lines, and Points for Shapefiles
After filtering and preprocessing the shapefiles, visualizations were generated to understand the spatial distribution of the data. This involved plotting:
i) Polygons to represent areas such as administrative boundaries, regions, or land use zones.
ii) Lines to display linear features like roads, rivers, or pathways.
iii) Points to mark specific locations like cities, stations, or sensor placements. These visualizations provided a spatial perspective of the data, helping to identify geographic trends and relationships.
- Boxplots for Each Column
To further explore the dataset, boxplots were created for each column in the dataframe. Boxplots are an effective way to visualize the distribution, central tendency (median), and spread (quartiles) of the data. They also highlight potential outliers in each column, allowing for a better understanding of the data’s range and variability. These boxplots were particularly useful in summarizing the characteristics of each feature before diving into more advanced analysis.
- By following these preprocessing steps, the data was cleaned, structured, and visualized, ensuring it was ready for further analysis and model building.

## Datasets used:
- The preprocessing steps mentioned above were applied on the 3 datasets listed below.
- GLIMS Dataset: https://www.glims.org/RGI/
- ICIMOD Dataset: https://drive.google.com/drive/folders/1cE-KfmBFyrq7VVGmcwhYaU23OBydUGhU?usp=sharing
- GLOF database spreadsheet which we found: https://github.com/valmikGit/SIH-GLOF/blob/main/sihGlof/resources/glofdatabase_V3-1.ods
- NOTE: For now we have used attribute.csv for rendering the datapoints on the frontend due to lesser rows in the dataset. We will later on update the dataset to a more extensive Indian dataset.

## Data visualizations to gain insights into the datasets and as a part of preprocessing:
- ![Visualization 1](https://github.com/valmikGit/SIH-GLOF/blob/main/sihGlof/mlModel/Polygon%20Plots/combined.png?raw=true)
- ![Visualization 2](https://github.com/valmikGit/SIH-GLOF/blob/main/sihGlof/mlModel/Polygon%20Plots/geospatial_plot_1.png?raw=true)
- ![Visualization 3](https://github.com/valmikGit/SIH-GLOF/blob/main/sihGlof/mlModel/Polygon%20Plots/lines.png?raw=true)
- ![Visualization 4](https://github.com/valmikGit/SIH-GLOF/blob/main/sihGlof/mlModel/Polygon%20Plots/points.png?raw=true)
- ![Visualization 5](https://github.com/valmikGit/SIH-GLOF/blob/main/sihGlof/mlModel/Polygon%20Plots/polygons.png?raw=true)

## Frontend -
- ![image](https://github.com/user-attachments/assets/18b8123f-8d25-4940-abe5-61693f41c0a2)
- Have created a global map in which specifically for Hind-Kush Regions we have created a layout where the user/government admin clicks on a specific region and this provides with a detailed analysis of the that part showing :
- Mean Elevation , Latitute, Longitude, Mean Width , Mean Length, Total Area, Mean Depth , Max Elevation, Min Elevation, Period activity start, Period activity end, Number of basins, Area in state, Area expansion, Source nourish are the attributes we have rendered. This provides a detailed analysis of that glacial lake which we feed into our ML model helping us predict the GLOF early saving us human lives.
## Backend -
- The .csv file containing all the parameters related to glaciers (one of the datasets which we found) was used to populate the database.
- The most useful columns were retained while the others were dropped.
- Then a Django task was made to load the filtered .csv file into the database.
- The backend has 1 API which sends all the rows of the database to the frontend.
