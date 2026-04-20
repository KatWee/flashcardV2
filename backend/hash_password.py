from auth import get_password_hash

# Generate hashed password for testuser
hashed_password = get_password_hash("testuser")
print(f"Hashed password: {hashed_password}")