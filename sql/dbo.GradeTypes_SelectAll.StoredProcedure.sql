USE [Resolvely]
GO
/****** Object:  StoredProcedure [dbo].[GradeTypes_SelectAll]    Script Date: 12/15/2023 6:03:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Mark Martinez
-- Create date: 11/22/2023
-- Description: An select proc for grade types
-- Code Reviewer: Luther Adamson

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[GradeTypes_SelectAll]

as

BEGIN
SELECT [Id]
      ,[GradeLetter]
  FROM [dbo].[GradeTypes]

End


GO
