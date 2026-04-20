from datetime import datetime, timedelta, timezone
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException, status
import jwt
import bcrypt

# Configuration
SECRET_KEY = "your-very-secret-key"  # Keep this safe!
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def get_password_hash(password: str) -> str:
    """Hash a raw password into a scramble string using the bcrypt algorithm."""
    pwd_bytes = password.encode("utf-8")  # Encode password to bytes
    salt = bcrypt.gensalt(rounds=12)
    hashed = bcrypt.hashpw(pwd_bytes, salt)  # Hash the password
    return hashed.decode("utf-8")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Convert the typed password into hash and check if it matches the hashed_password."""
    pwd_bytes = plain_password.encode("utf-8")  # Encode plain password to bytes
    hashed_bytes = hashed_password.encode(
        "utf-8"
    )  # Encode hashed password (from DB) to bytes
    return bcrypt.checkpw(pwd_bytes, hashed_bytes)  # Use checkpw to securely compare


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    """Create a token using username, expiry time, and the secret key."""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(token: str = Depends(oauth2_scheme)):
    """Dependency to get the current user from the token."""
    try:
        # Verify signature and expiration
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token payload",
            )
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired",
        )
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
        )
    return username
