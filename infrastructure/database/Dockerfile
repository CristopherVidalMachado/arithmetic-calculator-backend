ARG DOTNET_IMAGE=6.0-bullseye-slim

FROM mcr.microsoft.com/dotnet/sdk:${DOTNET_IMAGE} AS build

WORKDIR /src

COPY ["*.sqlproj", "*.publish.xml", "./"]
COPY ["*.bacpac", "/app/build/"]
RUN dotnet restore /p:NetCoreBuild=true 

COPY . .
WORKDIR "/src"

RUN dotnet build /p:NetCoreBuild=true -c Release -o /app/build

# Then we create the base image using instructions adapted from https://www.wintellect.com/devops-sql-server-dacpac-docker/
FROM mcr.microsoft.com/azure-sql-edge:latest AS base

#The azure-sq-edge is not available to use in MacOS, use the live below 
#FROM mcr.microsoft.com/mssql/server:2019-latest AS base

### Install Unzip
USER root
RUN apt-get update \
    && apt-get install unzip -y

### Install SQLPackage for Linux and make it executable
RUN wget -O sqlpackage.zip https://aka.ms/sqlpackage-linux \
    && unzip sqlpackage.zip -d /tmp/sqlpackage \
    && chmod +x /tmp/sqlpackage/sqlpackage

### Configure external build arguments to allow configurability.
ARG FILE_NAME
ARG SA_PASSWORD

ARG SQL_PACKAGE_STRATEGY
ARG SQL_PACKAGE_ACTION

ARG SERVER
ARG DATABASE
ARG USER
ARG PASSWORD

### Configure the required environmental variables
ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=$SA_PASSWORD
ENV MSSQL_PID=Developer

### Create the final stage for STRATEGY update
FROM base as mssql

### Add the STRATEGY to the image
COPY --from=build /app/build/${FILE_NAME}.${SQL_PACKAGE_STRATEGY} /tmp/db.${SQL_PACKAGE_STRATEGY}

### Launch SQL Server, confirm startup is complete, import the STRATEGY, then delete the BACPAC and terminate SQL Server.
RUN ( /opt/mssql/bin/sqlservr & ) | grep -q "Service Broker manager has started" \
    && /tmp/sqlpackage/sqlpackage \
    /a:${SQL_PACKAGE_ACTION} \
    /tsn:${SERVER} \
    /tdn:${DATABASE} \
    /tu:${USER} \
    /tp:${PASSWORD} \
    /ttsc:true \
    /sf:/tmp/db.${SQL_PACKAGE_STRATEGY} \
    && rm /tmp/db.${SQL_PACKAGE_STRATEGY} \
    && pkill sqlservr

### Create the final stage to publish 
FROM base as sqlpackage

COPY --from=build /app/build/${FILE_NAME}.dacpac /tmp/db.dacpac
COPY --from=build /src/Docker.publish.xml /tmp/Docker.publish.xml

ENV DATABASE=${DATABASE}
ENV USER=${USER}
ENV PASSWORD=${PASSWORD}
ENV SERVER=${SERVER}

### Run publish against the server
CMD /tmp/sqlpackage/sqlpackage \
    /a:Publish \
    /tsn:${SERVER} \
    /tdn:${DATABASE} \
    /tu:${USER} \
    /tp:${PASSWORD} \
    /sf:/tmp/db.dacpac \
    /pr:/tmp/Docker.publish.xml