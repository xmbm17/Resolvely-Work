USE [Resolvely]
GO
/****** Object:  StoredProcedure [dbo].[CourseWeight_SelectAll]    Script Date: 12/15/2023 6:03:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Mark Martinez
-- Create date: 11/22/2023
-- Description: A select proc for the course weight 
-- Code Reviewer: Luther Adamson 

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================
CREATE proc [dbo].[CourseWeight_SelectAll]
as

Begin
SELECT [Id]
      ,[Name]
  FROM [dbo].[CourseWeight]

End


GO
