# bulk_upload_csv.py
import csv
from django.core.management.base import BaseCommand
from glofapi.models import GLOFattributes
from django.db import transaction


class Command(BaseCommand):
    help = "Bulk upload data from a CSV file into the database"

    def add_arguments(self, parser):
        parser.add_argument(
            "file_path", type=str, help="The path to the CSV file to be uploaded."
        )

    @transaction.atomic  # Use a transaction to ensure all-or-nothing upload
    def handle(self, *args, **kwargs):
        file_path = kwargs["file_path"]
        print(f"Received file path: {file_path}")

        try:
            with open(file_path, mode="r", encoding="utf-8") as file:
                reader = csv.DictReader(file)
                data_list = []

                for row in reader:
                    data_list.append(
                        GLOFattributes(
                            latitude=row[" lat"],
                            longitude=row[" lon"],
                            totalarea=row[" total_area"],
                            meanwidth=row[" mean_width"],
                            meanlength=row[" mean_length"],
                            meanelevation=row[" mean_elev"],
                            meandepth=row[" mean_depth"],
                            maxelevation=row[" max_elev"],
                            minelevation=row[" min_elev"],
                        )
                    )

                # Bulk create all records at once for efficiency
                GLOFattributes.objects.bulk_create(data_list)

            self.stdout.write(
                self.style.SUCCESS(f"Successfully uploaded data from {file_path}.")
            )

        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Error uploading data: {e}"))
