// Utility functions for data formatting, validation, and common operations
export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  export const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength).trim()}...`;
  };
  
  export const validatePostData = (data) => {
    const errors = {};
    
    if (!data.title?.trim()) {
      errors.title = 'Title is required';
    }
    
    if (!data.author?.trim()) {
      errors.author = 'Author is required';
    }
    
    if (!data.content?.trim()) {
      errors.content = 'Content is required';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };
  
  export const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };
  
  export const getPaginationInfo = (currentPage, totalPosts, postsPerPage) => {
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    const hasNextPage = currentPage < totalPages;
    const hasPrevPage = currentPage > 1;
    
    return {
      totalPages,
      hasNextPage,
      hasPrevPage,
      startIndex: (currentPage - 1) * postsPerPage,
      endIndex: Math.min(currentPage * postsPerPage, totalPosts)
    };
  };
  
  export const getSearchParams = (params) => {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value) searchParams.append(key, value);
    });
    
    return searchParams.toString();
  };
  
  export const handleApiError = (error) => {
    if (error.response) {
      return {
        message: error.response.data.message || 'Server error occurred',
        status: error.response.status
      };
    }
    
    return {
      message: error.message || 'An unexpected error occurred',
      status: 500
    };
  };