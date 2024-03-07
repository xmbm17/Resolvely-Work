USE [Resolvely]
GO
/****** Object:  StoredProcedure [dbo].[GpaCalc_Delete]    Script Date: 12/15/2023 6:03:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Mark Martinez
-- Create date: 11/22/2023
-- Description: A proc to delete a certain record
-- Code Reviewer:Luther Adamson

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

CREATE PROC [dbo].[GpaCalc_Delete]
@Id int 

as 

/*testt codeeee


Declare @id int = 3
EXECUTE dbo.GpaCalc_Delete @id


*/


BEGIN

DELETE FROM [dbo].[GpaCalc] 
      WHERE Id = @Id


END
GO
