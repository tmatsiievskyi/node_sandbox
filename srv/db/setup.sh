psql -f install.sql -U taras
PGPASSWORD=taras psql -d node_db -f structure.sql -U taras
PGPASSWORD=taras psql -d node_db -f data.sql -U taras