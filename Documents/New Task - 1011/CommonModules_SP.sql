GO
IF EXISTS (Select * From sys.procedures Where [Name]='Sol_spGetCatalogs')
BEGIN
	DROP PROCEDURE [Sol_spGetCatalogs]
END
GO
-- ==========================================================================================
-- Description:	@ErrorFlag - 0: No Error; 1: OtherException
-- ==========================================================================================
CREATE PROCEDURE [dbo].[Sol_spGetCatalogs]
@UserID int,
@ErrorFlag int OUTPUT
AS
BEGIN
	BEGIN TRY    
		SET NOCOUNT OFF
	 
	    select Distinct c.CatalogServiceId as CatalogID,c.[Name],c.[Desc],c.HelpID,c.SettingsID
		, Case WHEN o.SortOrder is not null THEN o.SortOrder ELSE c.SortOrder END as SortOrder 
		from dbo.[tTest.UserID.ServiceID] t
		inner join dbo.[Sol.tCatalogServicesRelation] r on t.ServiceID = r.ServiceID
		inner join dbo.[Sol.tCatalogServices] c on r.CatalogID = c.CatalogServiceId
		left join dbo.[Sol.tCatalogServicesOrder] o on o.CatalogServiceId = c.CatalogServiceId and o.UserID = t.UserID
		left join dbo.[Sol.tHideCatalogServices] h on h.CatalogServiceId = c.CatalogServiceId and h.UserID = t.UserID
		where t.UserID = @UserID 
		and h.CatalogServiceId is null 
		order by SortOrder asc

		set @ErrorFlag = 0
	END TRY    
	BEGIN CATCH      
		-- Execute error retrieval routine.      
		DECLARE @ErrorMsg NVARCHAR(MAX) = ERROR_MESSAGE()    
		set @ErrorFlag = 1
	END CATCH;    
END

GO
IF EXISTS (Select * From sys.procedures Where [Name]='Sol_spGetServices')
BEGIN
	DROP PROCEDURE [Sol_spGetServices]
END
GO
-- ==========================================================================================
-- Description:	@ErrorFlag - 0: No Error; 1: OtherException
-- ==========================================================================================
CREATE PROCEDURE [dbo].[Sol_spGetServices]
@UserID int,
@CatalogID int,
@ErrorFlag int OUTPUT
AS
BEGIN
	BEGIN TRY    
	SET NOCOUNT OFF

		select Distinct c.CatalogServiceId as ServiceID,c.[Name],c.[Desc],c.HelpID,c.SettingsID, Case WHEN o.SortOrder is not null THEN o.SortOrder ELSE c.SortOrder END as SortOrder 
		from dbo.[tTest.UserID.ServiceID] t
		inner join dbo.[Sol.tCatalogServicesRelation] r on t.ServiceID = r.ServiceID  and r.CatalogID = @CatalogID
		inner join dbo.[Sol.tCatalogServices] c on r.ServiceID = c.CatalogServiceId
		left join dbo.[Sol.tCatalogServicesOrder] o on o.CatalogServiceId = c.CatalogServiceId and o.UserID = t.UserID
		left join dbo.[Sol.tHideCatalogServices] h on h.CatalogServiceId = c.CatalogServiceId and h.UserID = t.UserID
		where h.CatalogServiceId is null and t.UserID = @UserID
		order by SortOrder asc

		set @ErrorFlag = 0

	END TRY    
	BEGIN CATCH      
		-- Execute error retrieval routine.      
		DECLARE @ErrorMsg NVARCHAR(MAX) = ERROR_MESSAGE()    
		set @ErrorFlag = 1
	END CATCH;    
END


GO
IF EXISTS (Select * From sys.procedures Where [Name]='Sol_spHideCatalogServices')
BEGIN
	DROP PROCEDURE [Sol_spHideCatalogServices]
END
GO
-- ==========================================================================================
-- Description:	@ErrorFlag - 0: No Error; 1: OtherException
-- ==========================================================================================
CREATE PROCEDURE [dbo].[Sol_spHideCatalogServices]
@UserID int,
@CatalogServiceID int,
@toHide bit,
@ErrorFlag int OUTPUT
AS
BEGIN
	BEGIN TRY    
		SET NOCOUNT OFF

		if (@toHide = 1)
		BEGIN
			insert into dbo.[Sol.tHideCatalogServices] values(@UserID,@CatalogServiceID)
		END
		ELSE
		BEGIN
			delete from dbo.[Sol.tHideCatalogServices] where UserID = @UserID and CatalogServiceId=@CatalogServiceID
		END
		set @ErrorFlag = 0

	END TRY    
	BEGIN CATCH      
		-- Execute error retrieval routine.      
		DECLARE @ErrorMsg NVARCHAR(MAX) = ERROR_MESSAGE()    
		set @ErrorFlag = 1
	END CATCH;    
END

GO
IF EXISTS (SELECT * FROM sys.procedures WHERE [Name]='Sol_spUpdateCatalogServicesOrder')
BEGIN
	DROP PROCEDURE [Sol_spUpdateCatalogServicesOrder]
END
GO
-- ==========================================================================================
-- Description:	@ErrorFlag - 0: No Error; 1: Duplicate SortOrder; 2: OtherException
-- ==========================================================================================
CREATE PROCEDURE [dbo].[Sol_spUpdateCatalogServicesOrder]
@UserID INT,
@CatalogServiceID INT,
@SortOrder INT,
@ErrorFlag int OUTPUT
AS
BEGIN
	BEGIN TRY    
		SET NOCOUNT OFF

		if exists (select * from [Sol.tCatalogServicesOrder] WHERE UserID = @UserID and CatalogServiceId=@CatalogServiceID and SortOrder = @SortOrder)
		BEGIN
			if exists (select * from [Sol.tCatalogServicesOrder] WHERE UserID = @UserID and CatalogServiceId=@CatalogServiceID)
			BEGIN
				UPDATE dbo.[Sol.tCatalogServicesOrder] SET SortOrder = @SortOrder WHERE UserID = @UserID and CatalogServiceId=@CatalogServiceID
			END
			ELSE
			BEGIN
				insert into dbo.[Sol.tCatalogServicesOrder] values(@UserID,@CatalogServiceID,@SortOrder)
			END
			set @ErrorFlag = 0
		END
		ELSE
		BEGIN
			set @ErrorFlag = 1
		END

	END TRY    
	BEGIN CATCH      
		-- Execute error retrieval routine.      
		DECLARE @ErrorMsg NVARCHAR(MAX) = ERROR_MESSAGE()    
		set @ErrorFlag = 2
	END CATCH;    
END


GO
IF EXISTS (Select * From sys.procedures Where [Name]='Sol_spCreateUpdateCatalogServices')
BEGIN
	DROP PROCEDURE [Sol_spCreateUpdateCatalogServices]
END
GO
-- ==========================================================================================
-- Description:	@ErrorFlag - 0: No Error; 1: Duplicate SortOrder; 2: OtherException
-- ==========================================================================================
CREATE PROCEDURE [dbo].[Sol_spCreateUpdateCatalogServices]
@SortOrder int,
@CatalogServiceID int,
@Name nvarchar(120),
@Desc nvarchar(512),
@HelpID int,
@SettingsID int,
@ErrorFlag int OUTPUT
AS
BEGIN
	BEGIN TRY    
		SET NOCOUNT OFF

		if exists (select * from [Sol.tCatalogServicesOrder] WHERE CatalogServiceId=@CatalogServiceID and SortOrder = @SortOrder)
		BEGIN
			if exists (select * from [Sol.tCatalogServices] WHERE CatalogServiceId=@CatalogServiceID)
			BEGIN
				UPDATE dbo.[Sol.tCatalogServices] SET [Name] = @Name,[Desc]=@Desc,HelpID=@HelpID,SettingsID=@SettingsID WHERE CatalogServiceId=@CatalogServiceID
			END
			ELSE
			BEGIN
				insert into dbo.[Sol.tCatalogServices] values(@CatalogServiceID,@SortOrder,@Name,@Desc,@HelpID,@SettingsID)
			END

			set @ErrorFlag = 0
		END
		ELSE
		BEGIN
			set @ErrorFlag = 1
		END
	END TRY    
	BEGIN CATCH      
		-- Execute error retrieval routine.      
		DECLARE @ErrorMsg NVARCHAR(MAX) = ERROR_MESSAGE()    
		set @ErrorFlag = 2
	END CATCH;     
END

GO
IF EXISTS (Select * From sys.procedures Where [Name]='Sol_spCreateUpdateCatalogServicesRelation')
BEGIN
	DROP PROCEDURE [Sol_spCreateUpdateCatalogServicesRelation]
END
GO
-- ==========================================================================================
-- Description:	@ErrorFlag - 0: No Error; 1: OtherException
-- ==========================================================================================
CREATE PROCEDURE [dbo].[Sol_spCreateUpdateCatalogServicesRelation]
@CatalogID int,
@ServiceID int,
@ServiceCustomization nvarchar(1024),
@ErrorFlag int OUTPUT
AS
BEGIN
	BEGIN TRY    
		SET NOCOUNT OFF

		if exists (select * from [Sol.tCatalogServicesRelation] WHERE CatalogID =@CatalogID and ServiceID = @ServiceID)
		BEGIN
			UPDATE dbo.[Sol.tCatalogServicesRelation] SET ServiceCustomization = @ServiceCustomization WHERE CatalogID =@CatalogID and ServiceID = @ServiceID
		END
		ELSE
		BEGIN
			insert into dbo.[Sol.tCatalogServicesRelation] values(@CatalogID,@ServiceID,@ServiceCustomization)
		END

	set @ErrorFlag = 0

	END TRY    
	BEGIN CATCH      
		-- Execute error retrieval routine.      
		DECLARE @ErrorMsg NVARCHAR(MAX) = ERROR_MESSAGE()    
		set @ErrorFlag = 1
	END CATCH;    
END
