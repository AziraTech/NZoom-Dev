IF EXISTS (Select * From sys.tables Where [Name]='Sol.tCatalogServices')
BEGIN
	DROP TABLE [Sol.tCatalogServices]
END
GO
CREATE TABLE [dbo].[Sol.tCatalogServices] (
	CatalogServiceId int,
	SortOrder int,
	[Name] nvarchar(120),
	[Desc] nvarchar(512),
	HelpID int,
	SettingsID int
)

IF EXISTS (Select * From sys.tables Where [Name]='Sol.tCatalogServicesRelation')
BEGIN
	DROP TABLE [Sol.tCatalogServicesRelation]
END
GO
CREATE TABLE [dbo].[Sol.tCatalogServicesRelation] (
	CatalogID int,
	ServiceID int,
	ServiceCustomization nvarchar(1024)
)

IF EXISTS (Select * From sys.tables Where [Name]='Sol.tCatalogServicesOrder')
BEGIN
	DROP TABLE [Sol.tCatalogServicesOrder]
END
GO
CREATE TABLE [dbo].[Sol.tCatalogServicesOrder] (
	UserID int,
	CatalogServiceId int,
	SortOrder int
)
GO
IF EXISTS (Select * From sys.tables Where [Name]='Sol.tHideCatalogServices')
BEGIN
	DROP TABLE [Sol.tHideCatalogServices]
END
GO
CREATE TABLE [dbo].[Sol.tHideCatalogServices] (
	UserID int,
	CatalogServiceId int
)
GO
IF EXISTS (Select * From sys.tables Where [Name]='tTest.UserID.ServiceID')
BEGIN
	DROP TABLE [tTest.UserID.ServiceID]
END
GO
CREATE TABLE [dbo].[tTest.UserID.ServiceID] (
	UserID int,
	ServiceID int
)
